using IPEK.Courses.Server.Domain.Entities.BaseEntities;
using IPEK.Courses.Server.Extensions;
using IPEK.Courses.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IPEK.Courses.Server.Controllers.Base
{
    /// <summary>
    /// Базовый контролер для простых действий с сущностю
    /// </summary>
    /// <typeparam name="TEntity">Любой наследник:<see cref="BaseEntity"/></typeparam>
    public class BaseCrudController<TEntity, TDto> : ControllerBase 
        where TEntity : BaseEntity
        where TDto : class
    {
        protected readonly IRepository<TEntity> _repository;

        protected BaseCrudController(IRepository<TEntity> repository)
        {
            _repository = repository;
        }

        //[HttpGet]
        //public virtual async Task<ActionResult<IEnumerable<TEntity>>> GetAllEntities() => await _repository.GetAllAsync().ToActionResult();

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TDto>>> GetEntityAsDto()
        {
            var entity = await _repository.GetAllAsync().ContinueWith(async task =>
            {
                var entityCollection = await task;
                return entityCollection.Select(concreteEntity => (TDto) concreteEntity.ToDto());
            });
            return await entity.ToActionResult();
        }

        // GET: api/StudentGroups/5
        [HttpGet("id")]
        public virtual async Task<ActionResult<TDto>> GetOneById(Guid id) => await _repository.GetByIdAsync(id).ToDto<TEntity, TDto>().ToActionResult();

        // POST: api/StudentGroups
        [HttpPost]
        public virtual async Task<ActionResult<TDto>> CreateEntity(TEntity entity) => await _repository.AddAsync(entity).ToDto<TEntity, TDto>().ToActionResult();

        // PUT: api/StudentGroups/5
        [HttpPut]
        public virtual async Task<ActionResult<TDto>> UpdateEntity(TEntity entity) => await _repository.UpdateAsync(entity).ToDto<TEntity, TDto>().ToActionResult();

        // DELETE: api/StudentGroups/5
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> DeleteEntityById(Guid id) => await _repository.DeleteAsync(id).ToActionResult();
    }
}
