using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
using System.Linq;

namespace IPEK.Courses.Server.Extensions
{
    public static class GroupExtensions
    {
        public static GroupDto ToDto(this StudentGroup group)
        {
            var result = new GroupDto
            {
                Id = group.Id,
                Name = group.Name,
                UserIds = group.Students?.Select(x => x.Id).ToList() ?? [],
            };

            return result;
        }
    }
}
