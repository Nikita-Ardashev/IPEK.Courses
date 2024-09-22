using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;

namespace IPEK.Courses.Server.Extensions
{
    public static class CourseTopicExtensions
    {
        public static CourseTopicDto ToDto(this CourseTopic entity)
        {
            ArgumentNullException.ThrowIfNull(entity, nameof(CourseTopic));

            var result = entity.Clone() as CourseTopicDto;

            ArgumentNullException.ThrowIfNull(result, nameof(CourseTopicDto));

            result.Tests = entity.Tests?.Select(x=> x.Id).ToArray();
            result.Theories = entity.Theories?.Select(x => x.Id).ToArray();
            result.Codes = entity.Codes?.Select(x => x.Id).ToArray();
            return result;
        }
    }
}
