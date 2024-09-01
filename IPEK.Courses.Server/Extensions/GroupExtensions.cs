using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;

namespace IPEK.Courses.Server.Extensions
{
    public static class GroupExtensions
    {
        public static GroupDto ToDto(this StudentGroup group, bool includeChildsDto = false)
        {
            var result = new GroupDto
            {
                Id = group.Id,
                Name = group.Name
            };
            if (includeChildsDto)
            {
                result.Users = group.Students.Select(x => x.ToUserDto()).ToArray();
            }

            return result;
        }
    }
}
