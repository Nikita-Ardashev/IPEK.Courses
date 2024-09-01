using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Domain.Entities
{
    public class TestAnswer : BaseEntity
    {
        public string Answer{ get; set; }
        public bool IsCorrectAnswer{ get; set; }
        public Guid QuestionId { get; set; }
        public virtual TestQuestion TestQuestion { get; set; }
    }
}
