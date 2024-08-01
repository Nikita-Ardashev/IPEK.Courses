namespace IPEK.Courses.Server.Domain.Entities
{
    public class TestQuestionMaping
    {
        public Guid Id { get; set; }
        public Guid TestId { get; set; }
        public virtual TestQuestion TestQuestion { get; set; }
        public Guid TestQuestionId { get; set; }
        public virtual TestTask TopicTest { get; set; }
    }
}
