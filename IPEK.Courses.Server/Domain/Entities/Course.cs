using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Domain.Entities;

public class Course : BaseEntity
{
    public required string BackgroundColorCode { get; set; }
    public byte[] Icon { get; set; }
    public virtual ICollection<CourseTopic> CourseTopics { get; set; }
    public virtual ICollection<UserCourse> UserCourses { get; set; }
}
