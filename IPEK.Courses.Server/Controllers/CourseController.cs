using IPEK.Courses.Server.Controllers.Base;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    public class CourseController(IRepository<Course> courseRepository) : BaseCrudController<Course, CourseDto>(courseRepository)
    {
    }
}