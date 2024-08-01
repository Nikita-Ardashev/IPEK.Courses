namespace IPEK.Courses.Server.Domain.Entities
{
    public class CodeTask : BaseEntity
    {
        public long TimeForTask { get; set; }
        public string Content { get; set; }
        public required string Task { get; set; }
        public required string Answer { get; set; }
        public Guid CourseTopicId { get; set; }
        public virtual CourseTopic CourseTopic { get; set; }
    }
}
