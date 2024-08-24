using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    public class TestTaskController : SimpleCrudController<TestTask>
    {
        public TestTaskController(IRepository<TestTask> repository) : base(repository) { }
    }
}
