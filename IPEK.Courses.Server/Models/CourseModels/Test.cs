using IPEK.Courses.Server.Models.Course;

namespace IPEK.Courses.Server.Models.CourseModels
{
    public class CourseTest : CourseTheme
    {
        public required CourseTestQuestion[] Questions { get; set; }
    }
}