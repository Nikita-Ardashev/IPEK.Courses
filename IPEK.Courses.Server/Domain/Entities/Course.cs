namespace IPEK.Courses.Server.Domain.Entities;

public class Course : BaseEntity
{
    public required byte[] BackgroundImage { get; set; }
    public required byte[] Icon { get; set; }
    public required ICollection<CourseTopic> CourseTopics { get; set; }
}
