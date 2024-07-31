namespace IPEK.Courses.Server.Domain.ViewModels.CourseModels
{
    public class CourseTest : CourseTheme
    {
        public required CourseTestQuestion[] Questions { get; set; }
    }
}
