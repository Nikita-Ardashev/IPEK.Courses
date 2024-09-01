using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;

namespace IPEK.Courses.Server.Extensions
{
    public static class CourseTopicExtensions
    {
        public static CourseTopicDto ToDto(this CourseTopic entity, bool includeChildsDto = false)
        {
            ArgumentNullException.ThrowIfNull(entity, nameof(CodeTask));
            var result = entity.Clone() as CourseTopicDto;
            ArgumentNullException.ThrowIfNull(result, nameof(CourseTopicDto));
            if (includeChildsDto)
            {
                result.Tests = entity.Tests?.ToArray();
                result.Theories = entity.Theories?.ToArray();
                result.Codes = entity.Codes?.ToArray();
            }
            return result;
        }
    }
}
