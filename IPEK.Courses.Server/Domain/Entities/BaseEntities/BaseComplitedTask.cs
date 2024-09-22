namespace IPEK.Courses.Server.Domain.Entities.BaseEntities
{
    public class BaseComplitedTask : BaseEntity
    {
        public bool ComplitedOnTimeEnd { get; set; }
        public bool Answered { get; set; }
        public bool AnsweredCorrectly { get; set; }
        public string Answer { get; set; }
        public string UserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public Guid TaskId { get; set; }
    }
}
