using IPEK.Courses.Server.Controllers.Base;
using IPEK.Courses.Server.Data;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Extensions;
using IPEK.Courses.Server.Interfaces;
using IPEK.Courses.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    public class CourseController(IRepository<Course> courseRepository, ApplicationDBContext context, UserManagerExtended userManager) : BaseCrudController<Course, CourseDto>(courseRepository)
    {
        [HttpGet("getUserCourses")]
        public async Task<ActionResult<CourseDto[]>> GetUserCourses(string userId) => await GetCoursesByUserId(context, userId).ToActionResult();

        [HttpPost(nameof(RegisterUser))]
        public async Task<IActionResult> RegisterUser(Guid courseId, string userId) => await RegisterUserAsync(courseId, userId).ToActionResult();
        
        private static async Task<CourseDto[]> GetCoursesByUserId(ApplicationDBContext context, string userId)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == userId) ?? throw new Exception("User not exist");
            var courses = user.UserCourses
                .Select(x => x.Course.ToDto())
                .ToArray();

            return courses;
        }

        private async Task RegisterUserAsync(Guid courseId, string userId)
        {
            var user = await userManager.GetUserById(userId);
            var course = await context.Courses.FirstOrDefaultAsync(x => x.Id == courseId) ?? throw new Exception("Course not exist");
            var userRegistered = course.UserCourses?.Any(x => x.UserId == userId) ?? false;

            if (userRegistered) return;

            course.UserCourses.Add(new UserCourse
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                CourseId = courseId,
                IsComlited = false
            });
            context.SaveChanges();
        }
    }
}