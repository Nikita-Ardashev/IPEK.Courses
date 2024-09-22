using IPEK.Courses.Server.Domain.Entities.BaseEntities;
using IPEK.Courses.Server.Domain.Models;

namespace IPEK.Courses.Server.Interfaces
{
    public interface ITaskWithUserContextProvider
    {
        Task<TaskWithUserContext<TDto>> GetUserContextAsync<TEntity, TDto>(Guid entityId, string userId) 
            where TEntity : BaseEntity
            where TDto : class;
    }
}
