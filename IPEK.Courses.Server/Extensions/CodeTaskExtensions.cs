using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;

namespace IPEK.Courses.Server.Extensions
{
    public static class CodeTaskExtensions
    {
        public static CodeTaskDto ToDto(this CodeTask entity, bool includeChildsDto = false)
        {
            ArgumentNullException.ThrowIfNull(entity, nameof(CodeTask));

            var result = entity.Clone()! as CodeTaskDto;
            if (includeChildsDto)
            {
                result!.ComplitedCodeTasks = entity.ComplitedCodeTasks?.ToArray();
            }
            return result!;
        }
    }
}
