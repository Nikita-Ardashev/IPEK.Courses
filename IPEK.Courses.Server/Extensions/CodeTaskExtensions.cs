using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;

namespace IPEK.Courses.Server.Extensions
{
    public static class CodeTaskExtensions
    {
        public static CodeTaskDto ToDto(this CodeTask entity)
        {
            ArgumentNullException.ThrowIfNull(entity, nameof(CodeTask));
            var result = new CodeTaskDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Task = entity.Task,
                TimeForTask = entity.TimeForTask,
                
            };
            return result!;
        }
    }
}
