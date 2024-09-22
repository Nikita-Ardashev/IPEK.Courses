using IPEK.Courses.Server.Data;
using IPEK.Courses.Server.Domain.Constants;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace IPEK.Courses.Server.Services
{
    public class UserManagerExtended
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly ApplicationDBContext _context;
        private readonly ILogger<UserManagerExtended> _logger;

        public UserManagerExtended(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, ApplicationDBContext context, ILogger<UserManagerExtended> logger)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
            _logger = logger;
        }

        public async Task<string> CreateUserAsync(CreateUserDto createUserDto)
        {
            var existUser = await _userManager.FindByEmailAsync(createUserDto.Email);
            if (!string.IsNullOrEmpty(existUser?.Id)) return existUser.Id;

            if (!RoleNames.Roles.Contains(createUserDto.RoleName)) throw new Exception("Unknown user role");

            var user = createUserDto.ToEntity();

            var createResult = await _userManager.CreateAsync(user, createUserDto.Password).Await();
            if (!createResult.Succeeded)
                throw new Exception($"Errors on create user: {ErrorsToString(createResult.Errors)}");

            await ChangeUserRole(user.Id, createUserDto.RoleName);

            return user.Id;
        }

        public async Task ChangeUserEmail(string userId, string newEmail)
        {
            var user = await GetUserByIdAsync(userId).Await();

            user.UserName = newEmail;
            user.Email = newEmail;

            var result = await _userManager.UpdateAsync(user).Await();
            if (result.Succeeded) return;

            throw new Exception("Error on update user");
        }

        public async Task ChangeUserGroup(string userId, Guid newGroupId)
        {
            var user = await GetUserByIdAsync(userId).Await();
            user.GroupId = newGroupId;
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
            var userDto = user.ToUserDto();
            return userDto;
        }

        public async Task<UserDto[]> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync().Await();
            var userDtos = users.Select(x => x.ToUserDto()).ToArray();
            return userDtos;
        }

        public async Task ChangeUserRole(string userId, string newRole)
        {
            if (!RoleNames.Roles.Contains(newRole)) throw new Exception("Unknown user role");

            var user = await GetUserByIdAsync(userId);

            var currentRoles = await _userManager.GetRolesAsync(user);
            var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeResult.Succeeded) throw new Exception("Failed to remove current roles.");

            var addResult = await _userManager.AddToRoleAsync(user, newRole);
            if (!addResult.Succeeded) throw new Exception("User role not changed.");
            var role = await _roleManager.FindByNameAsync(newRole);
            user.RoleId = role?.Id;
            
            _context.Update(user);
            await _context.SaveChangesAsync();
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
