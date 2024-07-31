namespace IPEK.Courses.Server.Domain.ViewModels.CourseModels
{
    public class CourseCode : CourseTheme
    {
        public required object Content { get; set; }
        public required string Task { get; set; }
        public required string Answer { get; set; }
    }
}
