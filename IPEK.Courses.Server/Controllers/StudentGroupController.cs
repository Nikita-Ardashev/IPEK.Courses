using IPEK.Courses.Server.Controllers.Base;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Extensions;
using IPEK.Courses.Server.Interfaces;
using IPEK.Courses.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    public class StudentGroupController(IRepository<StudentGroup> repository, GroupManager groupManager) : BaseCrudController<StudentGroup, GroupDto>(repository)
    {

        [HttpPost("createGroupWithStudents")]
        public virtual async Task<ActionResult<GroupDto>> CreateGroupWithStudents(string groupName, CreateUserDto[] users) =>
            await groupManager.CreateGroupWithStudents(groupName, users).ToActionResult();
    }
}