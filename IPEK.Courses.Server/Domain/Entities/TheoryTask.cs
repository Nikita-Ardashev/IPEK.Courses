using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Domain.Entities
{
    public class TheoryTask : BaseEntity
    {
        public string Content { get; set; }
        public Guid CourseTopicId { get; set; }
        public virtual CourseTopic CourseTopic { get; set; }
        public virtual ICollection<ComplitedTheoryTask> ComplitedTheoryTasks { get; set; }
    }
}
