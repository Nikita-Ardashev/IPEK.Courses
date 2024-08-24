using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;

namespace IPEK.Courses.Server.Controllers
{
    public class TestTaskController : SimpleCrudController<TestTask>
    {
        public TestTaskController(IRepository<TestTask> repository) : base(repository) { }
    }
}
