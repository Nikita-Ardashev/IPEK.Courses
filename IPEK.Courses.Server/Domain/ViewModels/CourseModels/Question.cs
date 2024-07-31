namespace IPEK.Courses.Server.Domain.ViewModels.CourseModels
{
    public class CourseTestQuestion
    {
        public required string Id { get; set; }
        public required string Quest { get; set; }
        public required string Answer { get; set; }
        public object? TrueAnswer { get; set; }

        public bool IsSingleAnswer() => TrueAnswer is int;

        public bool IsMultipleAnswers() => TrueAnswer is int[];
    }
}
