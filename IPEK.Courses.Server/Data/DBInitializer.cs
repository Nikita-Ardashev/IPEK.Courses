using IPEK.Courses.Server.Domain.Constants;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace IPEK.Courses.Server.Data
{
    public class DBInitializer
    {
        private readonly ApplicationDBContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManagerExtended _userManager;
        private readonly ILogger<DBInitializer> _logger;

        private const string AdminEmail = "admin@example.com";
        private const string TeacherEmail = "teacher@example.com";
        private const string Student1Email = "student1@example.com";
        private const string Student2Email = "student2@example.com";

        public DBInitializer(
            ApplicationDBContext context,
            RoleManager<IdentityRole> roleManager,
            UserManagerExtended userManager,
            ILogger<DBInitializer> logger) 
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
            _logger = logger;
        }

        public async Task InitialCreate()
        {
            try
            {
                await AddGroupIfNeed();
                await CreateRoles();
                await CreateUsers();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error on InitialCreate data in database");
            }
        }

        private async Task CreateUsers()
        {
            if (_context.Users.Any()) return;

            var adminUser = new CreateUserDto
            {
                Email = AdminEmail,
                Password = "Admin@123",
                RoleName = RoleNames.AdminRoleName,
            };
            await _userManager.CreateUserAsync(adminUser);

            var teacherUser = new CreateUserDto
            {
                Email = TeacherEmail,
                Password = "Teacher@123",
                RoleName = RoleNames.TeacherRoleName,
            };
            await _userManager.CreateUserAsync(teacherUser);

            var studentUser1 = new CreateUserDto
            {
                Email = Student1Email,
                GroupId = _context.StudentGroups.FirstOrDefault(x => x.Name == "Group A")?.Id,
                Password = "Student@123",
                RoleName = RoleNames.StudentRoleName,
            };
            await _userManager.CreateUserAsync(studentUser1);

            var studentUser2 = new CreateUserDto
            {
                Email = Student2Email,
                GroupId = _context.StudentGroups.FirstOrDefault(x => x.Name == "Group B")?.Id,
                Password = "Student@123",
                RoleName = RoleNames.StudentRoleName,
            };
            await _userManager.CreateUserAsync(studentUser2);
        }

        private async Task CreateRoles()
        {
            var roles = new[] { RoleNames.AdminRoleName, RoleNames.TeacherRoleName, RoleNames.StudentRoleName };
            foreach (var role in roles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }

        private async Task AddGroupIfNeed()
        {
            if (await _context.StudentGroups.AnyAsync()) return;
            
            var group1 = new StudentGroup { Id = Guid.NewGuid(), Name = "Group A" };
            var group2 = new StudentGroup { Id = Guid.NewGuid(), Name = "Group B" };
            _context.StudentGroups.AddRange(group1, group2);
            await _context.SaveChangesAsync();
        }
    }
}
