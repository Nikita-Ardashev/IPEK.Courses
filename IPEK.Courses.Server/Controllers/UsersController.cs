using IPEK.Courses.Server.Domain.Constants;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Extensions;
using IPEK.Courses.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IPEK.Courses.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = RoleNames.AdminRoleName)]
    public class UsersController : ControllerBase
    {
        private readonly UserManagerExtended _userManager;

        public UsersController(UserManagerExtended userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<string>> CreateUser(
            [FromBody] CreateUserDto createUserDto
        ) => await _userManager.CreateUserAsync(createUserDto).ToActionResult();

        [HttpPut(nameof(ChangeUserEmail))]
        public async Task<IActionResult> ChangeUserEmail(string id, string newEmail) =>
            await _userManager.ChangeUserEmail(id, newEmail).ToActionResult();

        [HttpPut(nameof(ChangeUserGroup))]
        public async Task<IActionResult> ChangeUserGroup(string id, Guid groupId) =>
            await _userManager.ChangeUserGroup(id, groupId).ToActionResult();

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id) =>
            await _userManager.DeleteUser(id).ToActionResult();

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(string id) =>
            await _userManager.GetUserById(id).ToActionResult();

        [HttpGet]
        public async Task<ActionResult<UserDto[]>> GetAllUsers() =>
            await _userManager.GetAllUsers().ToActionResult();

        [HttpPost(nameof(ChangeUserRole))]
        public async Task<IActionResult> ChangeUserRole(string userId, string newRole) =>
            await _userManager.ChangeUserRole(userId, newRole).ToActionResult();
    }
}
