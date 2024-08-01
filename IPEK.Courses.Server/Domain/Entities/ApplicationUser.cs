﻿using Microsoft.AspNetCore.Identity;

namespace IPEK.Courses.Server.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public Guid? GroupId { get; set; }
        public virtual StudentGroup? StudentGroup { get; set; }
        public virtual ICollection<UserCourse> UserCourses { get; set; }
        public virtual ICollection<ComplitedTheoryTask> ComplitedTheoryTask { get; set; }
        public virtual ICollection<ComplitedCodeTask> ComplitedCodeTasks { get; set; }
        public virtual ICollection<ComplitedTestTask> ComplitedTestTasks { get; set; }
        public virtual ICollection<ComplitedTestQuestion> ComplitedTestQuestions { get; set; }
    }
}
