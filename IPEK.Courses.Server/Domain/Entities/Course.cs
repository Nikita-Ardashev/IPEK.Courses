namespace IPEK.Courses.Server.Domain.Entities;

public class Course : BaseEntity
{
    public required byte[] BackgroundImage { get; set; }
    public required byte[] Icon { get; set; }
    public ICollection<CourseTopic> CourseTopics { get; set; }
    public ICollection<ApplicationUser> ApplicationUsers { get; set; }
}
