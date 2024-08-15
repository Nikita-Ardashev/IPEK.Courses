using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Domain.Entities;

public class TestQuestion : BaseEntity
{
    public virtual ICollection<TestAnswer> TestAnswers { get; set; }
    public virtual ICollection<TestTaskQuestion> TestTaskQuestions { get; set; }
    public virtual ICollection<ComplitedTestQuestion> ComplitedTestQuestions{ get; set; }
}
