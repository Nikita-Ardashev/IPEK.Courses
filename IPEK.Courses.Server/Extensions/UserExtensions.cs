using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;

namespace IPEK.Courses.Server.Extensions
{
    public static class UserExtensions
    {
        public static UserDto ToUserDto(this ApplicationUser applicationUser)
        {
            return new UserDto
            {
                Id = applicationUser.Id,
                Email = applicationUser.Email,
                GroupId = applicationUser.GroupId
            };
        }
    }
}
