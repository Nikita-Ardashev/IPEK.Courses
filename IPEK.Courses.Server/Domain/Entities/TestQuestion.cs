namespace IPEK.Courses.Server.Domain.Entities;

public class TestQuestion : BaseEntity
{
    public required string Question { get; set; }
    public virtual ICollection<TestAnswer> TestAnswers { get; set; }
}
