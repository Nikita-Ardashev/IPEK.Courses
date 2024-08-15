using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Domain.Entities
{
    public class CourseTopic : BaseEntity
    {
        public Guid CourseId { get; set; }
        public virtual Course Course { get; set; }
        public virtual ICollection<TestTask> Tests { get; set; }
        public virtual ICollection<TheoryTask> Theories { get; set; }
        public virtual ICollection<CodeTask> Codes { get; set; }
    }
}
