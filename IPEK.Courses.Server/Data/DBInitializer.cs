using IPEK.Courses.Server.Domain.Constants;
using IPEK.Courses.Server.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace IPEK.Courses.Server.Data
{
    public class DBInitializer
    {
        private readonly ApplicationDBContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<DBInitializer> _logger;

        private const string AdminEmail = "admin@example.com";
        private const string TeacherEmail = "teacher@example.com";
        private const string Student1Email = "student1@example.com";
        private const string Student2Email = "student2@example.com";

        public DBInitializer(
            ApplicationDBContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
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
            if (_userManager.Users.Any()) return;

            var adminUser = new ApplicationUser
            {
                UserName = AdminEmail,
                Email = AdminEmail,
                EmailConfirmed = true,
                GroupId = null // или GUID для группы
            };
            await _userManager.CreateAsync(adminUser, "Admin@123");
            await _userManager.AddToRoleAsync(adminUser, RoleNames.AdminRoleName);

            var teacherUser = new ApplicationUser
            {
                UserName = TeacherEmail,
                Email = TeacherEmail,
                EmailConfirmed = true,
                GroupId = null 
            };
            await _userManager.CreateAsync(teacherUser, "Teacher@123");
            await _userManager.AddToRoleAsync(teacherUser, RoleNames.TeacherRoleName);

            var studentUser1 = new ApplicationUser
            {
                UserName = Student1Email,
                Email = Student1Email,
                EmailConfirmed = true,
                GroupId = _context.StudentGroups.First().Id
            };
            await _userManager.CreateAsync(studentUser1, "Student@123");
            await _userManager.AddToRoleAsync(studentUser1, RoleNames.StudentRoleName);

            var studentUser2 = new ApplicationUser
            {
                UserName = Student2Email,
                Email = Student2Email,
                EmailConfirmed = true,
                GroupId = _context.StudentGroups.LastOrDefault()?.Id
            };
            await _userManager.CreateAsync(studentUser2, "Student@123");
            await _userManager.AddToRoleAsync(studentUser2, RoleNames.StudentRoleName);
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
