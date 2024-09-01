using IPEK.Courses.Server.Data;
using IPEK.Courses.Server.Domain.Constants;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IPEK.Courses.Server.Services
{
    public class UserManagerExtended
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDBContext _context;
        private readonly ILogger<UserManagerExtended> _logger;

        public UserManagerExtended(UserManager<ApplicationUser> userManager, ApplicationDBContext context, ILogger<UserManagerExtended> logger)
        {
            _userManager = userManager;
            _context = context;
            _logger = logger;
        }

        public async Task<string> CreateUserAsync(CreateUserDto createUserDto)
        {
            if (!RoleNames.Roles.Contains(createUserDto.RoleName)) throw new Exception("Uncnown user role");

            var user = new ApplicationUser
            {
                UserName = createUserDto.Email,
                Email = createUserDto.Email,
                GroupId = createUserDto.GroupId,
                EmailConfirmed = true
            };

            var createResult = await _userManager.CreateAsync(user, createUserDto.Password).Await();
            if (!createResult.Succeeded)
                throw new Exception($"Errors on create user: {ErrorsToString(createResult.Errors)}");

            var addToRoleResult = await _userManager.AddToRoleAsync(user, createUserDto.RoleName);
            if (!addToRoleResult.Succeeded)
            {
                var role = _context.Roles.FirstOrDefault(x => x.Name == createUserDto.RoleName);
                user.RoleId = role?.Id;
                _ = await _userManager.UpdateAsync(user).Await();
            }

            return user.Id;
        }

        public async Task ChangeUserEmail(string id, string newEmail)
        {
            var user = await GetUserByIdAsync(id).Await();

            user.UserName = newEmail;
            user.Email = newEmail;

            var result = await _userManager.UpdateAsync(user).Await();
            if (result.Succeeded) return;

            throw new Exception("Error on update user");
        }

        public async Task ChangeUserGroup(string id, string newGroupId)
        {
            var user = await GetUserByIdAsync(id).Await();
            user.GroupId = Guid.Parse(newGroupId);

            var result = await _userManager.UpdateAsync(user).Await();
            if (result.Succeeded) return;

            throw new Exception("Error on update user");
        }

        public async Task DeleteUser(string id)
        {
            var user = await GetUserByIdAsync(id).Await();

            var result = await _userManager.DeleteAsync(user).Await();
            if (result.Succeeded) return;

            throw new Exception($"Errors on delete user: {ErrorsToString(result.Errors)}");
        }

        public async Task<UserDto> GetUserById(string id)
        {
            var user = await GetUserByIdAsync(id).Await();
            var userDto = user.ToUserDto(true);
            return userDto;
        }

        public async Task<UserDto[]> GetAllUsers()
        {
            var users = await _context.Users.AsNoTracking().ToListAsync().Await();
            var userDtos = users.Select(x => x.ToUserDto(true)).ToArray();
            return userDtos;
        }

        public async Task ChangeUserRole(string userId, string newRole)
        {
            var user = await GetUserByIdAsync(userId);

            var currentRoles = await _userManager.GetRolesAsync(user);
            var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeResult.Succeeded) throw new Exception("Failed to remove current roles.");

            var addResult = await _userManager.AddToRoleAsync(user, newRole);
            if (!addResult.Succeeded) throw new Exception("User role changed successfully.");
        }

        private async Task<ApplicationUser> GetUserByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id).Await();
            if (user == null) throw new Exception("User not found");

            return user;
        }

        private static string ErrorsToString(IEnumerable<IdentityError> errors)
        {
            return string.Join(", ", errors.Select(x => x.Description));
        }
    }
}
