using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;

namespace IPEK.Courses.Server.Controllers
{
    public class TestQuestionController : SimpleCrudController<TestQuestion>
    {
        public TestQuestionController(IRepository<TestQuestion> repository) : base(repository) { }
    }
}
