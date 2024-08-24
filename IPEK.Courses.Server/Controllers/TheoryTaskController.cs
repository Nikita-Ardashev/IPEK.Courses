using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;

namespace IPEK.Courses.Server.Controllers
{
    public class TheoryTaskController : SimpleCrudController<TheoryTask>
    {
        public TheoryTaskController(IRepository<TheoryTask> repository) : base(repository) { }
    }
}
