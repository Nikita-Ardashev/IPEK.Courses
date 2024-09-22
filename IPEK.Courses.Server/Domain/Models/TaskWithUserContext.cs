namespace IPEK.Courses.Server.Domain.Models
{
    public class TaskWithUserContext<T>
    {
        public T Dto { get; set; }
        public long? TimeElapsed { get; set; }
        public string? Answer { get; set; }
        public bool? IsComplited { get; set; }
        public bool? AnsweredCorrectly { get; set; }
    }
}
