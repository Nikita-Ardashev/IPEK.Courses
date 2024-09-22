using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
namespace IPEK.Courses.Server.Extensions
{
    public static class UserExtensions
    {
        public static UserDto ToUserDto(this ApplicationUser applicationUser)
        {
            var result = new UserDto
            {
                Id = applicationUser.Id,
                FirstName = applicationUser.FirstName,
                SecondName = applicationUser.SecondName,
                ThirdName = applicationUser.ThirdName,
                Email = applicationUser.Email,
                GroupId = applicationUser.GroupId,
                RoleName = applicationUser.Role?.Name,
                CourseIds = applicationUser.UserCourses.Select(x => x.Course.Id).ToArray()
            };
            return result;
        }

        public static ApplicationUser ToEntity(this CreateUserDto createUserDto)
        {
            return new ApplicationUser
            {
                UserName = createUserDto.Email,
                FirstName = createUserDto.FirstName,
                SecondName = createUserDto.SecondName,
                ThirdName = createUserDto.ThirdName,
                Email = createUserDto.Email,
                GroupId = createUserDto.GroupId,
                EmailConfirmed = true
            };
        }
    }
}
