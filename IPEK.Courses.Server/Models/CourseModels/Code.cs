namespace IPEK.Courses.Server.Models.CourseModels
{
    public class CourseCode : CourseTheme
    {
        public required object Content { get; set; }
        public required string Task { get; set; }
        public required string Answer { get; set; }
    }
}
