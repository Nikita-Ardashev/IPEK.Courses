using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;

namespace IPEK.Courses.Server.Controllers
{
    public class CodeTaskController : SimpleCrudController<CodeTask>
    {
        public CodeTaskController(IRepository<CodeTask> repository) : base(repository)
        {
        }
    }
}
