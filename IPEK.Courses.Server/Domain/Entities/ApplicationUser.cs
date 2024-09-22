using Microsoft.AspNetCore.Identity;

namespace IPEK.Courses.Server.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string ThirdName { get; set; }
        public string? RoleId { get; set; }
        public virtual ApplicationRole Role { get; set; }
        public Guid? GroupId { get; set; }
        public virtual StudentGroup? StudentGroup { get; set; }
        public virtual ICollection<UserCourse> UserCourses { get; set; }
        public virtual ICollection<ComplitedTheoryTask> ComplitedTheoryTask { get; set; }
        public virtual ICollection<ComplitedCodeTask> ComplitedCodeTasks { get; set; }
        public virtual ICollection<ComplitedTestTask> ComplitedTestTasks { get; set; }
        public virtual ICollection<ComplitedTestQuestion> ComplitedTestQuestions { get; set; }
    }
}
