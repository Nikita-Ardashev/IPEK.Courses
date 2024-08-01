namespace IPEK.Courses.Server.Domain.Entities
{
    public class BaseComplitedTask<T>
    {
        public Guid Id { get; set; }
        public bool ComplitedOnTimeEnd { get; set; }
        public bool Answered { get; set; }
        public bool AnsweredCorrectly { get; set; }
        public Guid UserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public Guid TaskId { get; set; }
        public virtual T Task { get; set; }
    }
}
