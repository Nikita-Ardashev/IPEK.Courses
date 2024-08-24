using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    public class TheoryTaskController : SimpleCrudController<TheoryTask>
    {
        public TheoryTaskController(IRepository<TheoryTask> repository) : base(repository) { }
    }
}
