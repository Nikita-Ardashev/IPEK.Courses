using IPEK.Courses.Server.Controllers.Base;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;
using Microsoft.AspNetCore.Components;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    public class TestQuestionController(IRepository<TestQuestion> repository) : BaseCrudController<TestQuestion, object>(repository)
    {
    }
}
