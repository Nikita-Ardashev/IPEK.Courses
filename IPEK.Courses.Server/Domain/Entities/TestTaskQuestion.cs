namespace IPEK.Courses.Server.Domain.Entities
{
    public class TestTaskQuestion
    {
        public Guid Id { get; set; }
        public Guid TestQuestionId { get; set; }
        public virtual TestQuestion Question { get; set; }
        public Guid TestTaskId { get; set; }
        public virtual TestTask Task { get; set; }
    }
}
