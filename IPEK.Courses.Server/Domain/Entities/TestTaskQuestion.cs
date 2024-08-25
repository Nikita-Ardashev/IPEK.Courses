using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Domain.Entities
{
    public class TestTaskQuestion : BaseEntity
    {
        public Guid TestQuestionId { get; set; }
        public virtual TestQuestion Question { get; set; }
        public Guid TestTaskId { get; set; }
        public virtual TestTask Task { get; set; }
    }
}
