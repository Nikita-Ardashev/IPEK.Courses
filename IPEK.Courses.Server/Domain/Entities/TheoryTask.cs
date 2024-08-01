namespace IPEK.Courses.Server.Domain.Entities
{
    public class TheoryTask : BaseEntity
    {
        public string Content { get; set; }
        public Guid CourseTopicId { get; set; }
        public virtual CourseTopic CourseTopic { get; set; }
        public ICollection<ComplitedTheoryTask> ComplitedTheoryTasks { get; set; }
    }
}
