namespace IPEK.Courses.Server.Domain.Entities
{
    public class TestAnswer
    {
        public Guid Id { get; set; }
        public string Answer{ get; set; }
        public bool IsCorrectAnswer{ get; set; }
        public Guid QuestionId { get; set; }
        public TestQuestion TestQuestion { get; set; }
    }
}
