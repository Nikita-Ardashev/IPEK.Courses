using IPEK.Courses.Server.Controllers.Base;
using IPEK.Courses.Server.Data;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Extensions;
using IPEK.Courses.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    public class CourseController(IRepository<Course> courseRepository, ApplicationDBContext context) : BaseCrudController<Course, CourseDto>(courseRepository)
    {
        [HttpGet("getUserCourses")]
        public async Task<ActionResult<CourseDto[]>> GetUserCourses(string userId) => await GetCoursesByUserId(context, userId).ToActionResult();

        private static async Task<CourseDto[]> GetCoursesByUserId(ApplicationDBContext context, string userId)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == userId) ?? throw new Exception("User not exist");
            var courses = user.UserCourses
                .Select(x => x.Course.ToDto())
                .ToArray();

            return courses;
        }
    }
}