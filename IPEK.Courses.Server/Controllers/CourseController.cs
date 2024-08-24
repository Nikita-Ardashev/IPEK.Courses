using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    public class CourseController : SimpleCrudController<Course>
    {
        public CourseController(IRepository<Course> courseRepository) : base(courseRepository) { }
    }
}
