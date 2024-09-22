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
                StudentGroup group => group.ToDto(),
                Course course => course.ToDto(),
                CourseTopic topic => topic.ToDto(),
                CodeTask codeTask => codeTask.ToDto(),
                _ => throw new NotSupportedException($"Need new mapping for type: {entity.GetType().FullName}"),
            };
        }

        public static async Task<TDto> ToDto<TEntity, TDto>(this Task<TEntity> entityTask) 
            where TEntity : BaseEntity
            where TDto : class
        {
            var entity = await entityTask.ConfigureAwait(false);
            return await Task.Run(() => (TDto)entity.ToDto());
        }
    }
}
