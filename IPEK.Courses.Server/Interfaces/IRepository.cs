﻿using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(Guid id);
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task DeleteAsync(Guid id);
    }
}
