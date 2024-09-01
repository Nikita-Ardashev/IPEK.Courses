using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
namespace IPEK.Courses.Server.Extensions
{
    public static class UserExtensions
    {
        public static UserDto ToUserDto(this ApplicationUser applicationUser, bool includeChildsDto = false)
        {
            var result = new UserDto
            {
                Id = applicationUser.Id,
                Email = applicationUser.Email,
                GroupId = applicationUser.GroupId,
                RoleName = applicationUser.Role?.Name
            };
            if (includeChildsDto)
            {
                result.Group = applicationUser.StudentGroup?.ToDto();
            }
            return result;
        }
    }
}
