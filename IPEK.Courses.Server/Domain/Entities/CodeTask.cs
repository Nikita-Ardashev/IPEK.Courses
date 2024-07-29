namespace IPEK.Courses.Server.Domain.Entities
{
    public class CodeTask : BaseEntity
    {
        public string Content { get; set; }
        public required string Task { get; set; }
        public required string Answer { get; set; }
        public Guid TopicId { get; set; }
        public virtual CourseTopic Topic { get; set; }
    }
}
