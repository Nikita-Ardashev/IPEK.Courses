namespace IPEK.Courses.Server.Domain.ViewModels.CourseModels
{
    public class Themes
    {
        public CourseTheory? Theory { get; set; }
        public CourseCode? Code { get; set; }
        public CourseTest? Test { get; set; }
    }

    public class Course
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Background { get; set; }
        public required string Icon { get; set; }
        public required ICollection<Themes> Themes { get; set; }
    }
}
