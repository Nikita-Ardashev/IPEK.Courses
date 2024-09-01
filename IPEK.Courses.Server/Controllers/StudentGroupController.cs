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
    public class StudentGroupController : BaseCrudController<StudentGroup, GroupDto>
    {
        private readonly GroupManager _groupManager;

        public StudentGroupController(IRepository<StudentGroup> repository, GroupManager groupManager) : base(repository)
        {
            _groupManager = groupManager;
        }

        [HttpGet("groupWithStudents")]
        public virtual async Task<ActionResult<GroupDto>> GetStudentGroupWithUser(Guid id) => await _groupManager.GetGroupById(id).ToActionResult();
    }
}