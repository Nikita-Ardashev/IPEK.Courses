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
    public class BaseCrudController<TEntity> : ControllerBase where TEntity : BaseEntity
    {
        private readonly IRepository<TEntity> _repository;

        protected BaseCrudController(IRepository<TEntity> repository)
        {
            _repository = repository;
        }

        // GET: api/StudentGroups
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TEntity>>> GetAllStudentGroups() => await _repository.GetAllAsync().ToActionResult();

        // GET: api/StudentGroups/5
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TEntity>> GetStudentGroup(Guid id) => await _repository.GetByIdAsync(id).ToActionResult();

        // POST: api/StudentGroups
        [HttpPost]
        public virtual async Task<ActionResult<TEntity>> PostStudentGroup(TEntity courseTopic) => await _repository.AddAsync(courseTopic).ToActionResult();

        // PUT: api/StudentGroups/5
        [HttpPut]
        public virtual async Task<ActionResult<TEntity>> PutStudentGroup(TEntity courseTopic) => await _repository.UpdateAsync(courseTopic).ToActionResult();

        // DELETE: api/StudentGroups/5
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> DeleteStudentGroup(Guid id) => await _repository.DeleteAsync(id).ToActionResult();
    }
}
