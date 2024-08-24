namespace IPEK.Courses.Server.Domain.Entities.BaseEntities
{
    public class BaseComplitedTask<T>
    {
        public Guid Id { get; set; }
        public bool ComplitedOnTimeEnd { get; set; }
        public bool Answered { get; set; }
        public bool AnsweredCorrectly { get; set; }
        public string UserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public Guid TaskId { get; set; }
        public virtual T Task { get; set; }
    }
}
