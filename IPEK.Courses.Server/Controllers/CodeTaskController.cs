using IPEK.Courses.Server.Controllers.Base;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Extensions;
using IPEK.Courses.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    public class CodeTaskController(IRepository<CodeTask> repository, ITaskWithUserContextProvider taskWithUserContextProvider) : BaseCrudController<CodeTask, CodeTaskDto>(repository)
    {
        [HttpGet("withUserContext")]
        public async Task<ActionResult<TaskWithUserContext<CodeTaskDto>>> WithUserContext(Guid entityId, string userId) => 
            await taskWithUserContextProvider.GetUserContextAsync<CodeTask, CodeTaskDto>(entityId, userId).ToActionResult();
    }
}
