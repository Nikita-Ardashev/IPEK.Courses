using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    public class StudentGroupsController : SimpleCrudController<StudentGroup>
    {
        public StudentGroupsController(IRepository<StudentGroup> repository) : base(repository)
        {
        }
    }
}
