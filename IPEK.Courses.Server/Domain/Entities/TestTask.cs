namespace IPEK.Courses.Server.Domain.Entities;

public class TestTask : BaseEntity
{
    public long TimeForTask { get; set; }
    public Guid CourseTopicId { get; set; }
    public virtual CourseTopic CourseTopic { get; set; }
    public virtual ICollection<TestQuestion> Questions { get; set; }
}
