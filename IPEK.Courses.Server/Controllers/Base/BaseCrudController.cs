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
    public class BaseCrudController<TEntity, TEntityDto> : ControllerBase 
        where TEntity : BaseEntity
        where TEntityDto : class
    {
        private readonly IRepository<TEntity> _repository;

        protected BaseCrudController(IRepository<TEntity> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TEntity>>> GetAllEntities() => await _repository.GetAllAsync().ToActionResult();

        [HttpGet("dto")]
        public virtual async Task<ActionResult<IEnumerable<TEntityDto>>> GetEntityAsDto()
        {
            var entity = await _repository
                .GetAllAsync()
                .ContinueWith(async x =>
            {
                var q = await x;
                return q.Select(x => (TEntityDto) x.ToDto());
            });
            return await entity.ToActionResult();
        }

        // GET: api/StudentGroups/5
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TEntity>> GetOneById(Guid id) => await _repository.GetByIdAsync(id).ToActionResult();

        // POST: api/StudentGroups
        [HttpPost]
        public virtual async Task<ActionResult<TEntity>> CreateEntity(TEntity courseTopic) => await _repository.AddAsync(courseTopic).ToActionResult();

        // PUT: api/StudentGroups/5
        [HttpPut]
        public virtual async Task<ActionResult<TEntity>> UpdateEntity(TEntity courseTopic) => await _repository.UpdateAsync(courseTopic).ToActionResult();

        // DELETE: api/StudentGroups/5
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> DeleteEntityById(Guid id) => await _repository.DeleteAsync(id).ToActionResult();
    }
}
