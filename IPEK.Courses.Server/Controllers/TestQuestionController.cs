using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;
using Microsoft.AspNetCore.Components;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    public class TestQuestionController : SimpleCrudController<TestQuestion>
    {
        public TestQuestionController(IRepository<TestQuestion> repository) : base(repository) { }
    }
}
