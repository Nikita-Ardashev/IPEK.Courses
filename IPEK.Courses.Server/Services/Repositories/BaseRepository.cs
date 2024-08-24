using IPEK.Courses.Server.Data;
using IPEK.Courses.Server.Domain.Entities.BaseEntities;
using IPEK.Courses.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IPEK.Courses.Server.Services.Repositories
{
    public class Repository<TDbModel> : IRepository<TDbModel> where TDbModel : BaseEntity
    {
        private readonly ApplicationDBContext _context;
        private readonly DbSet<TDbModel> _dbSet;

        public Repository(ApplicationDBContext context)
        {
            _context = context;
            _dbSet = context.Set<TDbModel>();
        }

        public async Task<IEnumerable<TDbModel>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<TDbModel> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<TDbModel> AddAsync(TDbModel entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<TDbModel> UpdateAsync(TDbModel entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
