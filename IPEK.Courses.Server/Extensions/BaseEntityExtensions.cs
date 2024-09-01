using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Extensions
{
    public static class BaseEntityExtensions
    {
        public static object ToDto(this BaseEntity entity)
        {
            return entity switch
            {
                StudentGroup group => group.ToDto(true),
                Course course => course.ToDto(true),
                CourseTopic topic => topic.ToDto(true),
                CodeTask codeTask => codeTask.ToDto(true),
                _ => throw new NotSupportedException($"Need new mapping for type: {entity.GetType().FullName}"),
            };
        }
    }
}
