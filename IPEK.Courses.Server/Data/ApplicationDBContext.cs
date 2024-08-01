using IPEK.Courses.Server.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IPEK.Courses.Server.Data
{
    public class ApplicationDBContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> dbContextOptions)
            : base(dbContextOptions)
        {
#if DEBUG
            Database.EnsureCreated();
#endif
        }

        // Нужно для создания и применения миграций
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    base.OnConfiguring(optionsBuilder);
        //    optionsBuilder.UseSqlite("Data Source=IpekCourses.db");
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("ipek-course");

            #region ApplicationUser

            modelBuilder.Entity<ApplicationUser>()
                .HasOne(a => a.StudentGroup)
                .WithMany(a => a.Students)
                .HasForeignKey(a => a.StudentGroup);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(a => a.UserCourses)
                .WithOne(u => u.ApplicationUser)
                .HasForeignKey(c => c.CourseId);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(a => a.ComplitedTheoryTask)
                .WithOne(u => u.ApplicationUser)
                .HasForeignKey(c => c.TaskId);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(a => a.ComplitedCodeTasks)
                .WithOne(u => u.ApplicationUser)
                .HasForeignKey(c => c.TaskId);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(a => a.ComplitedTestTasks)
                .WithOne(u => u.ApplicationUser)
                .HasForeignKey(c => c.TaskId);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(a => a.ComplitedTestQuestions)
                .WithOne(u => u.ApplicationUser)
                .HasForeignKey(c => c.TaskId);

            #endregion

            #region CourseTopic
            modelBuilder.Entity<CourseTopic>()
                .HasOne(c => c.Course)
                .WithMany(c => c.CourseTopics)
                .HasForeignKey(c => c.CourseId);

            modelBuilder.Entity<CourseTopic>()
                .HasMany(t => t.Theories)
                .WithOne(c => c.CourseTopic)
                .HasForeignKey(c => c.CourseTopicId);

            modelBuilder.Entity<CourseTopic>()
                .HasMany(t => t.Codes)
                .WithOne(c => c.CourseTopic)
                .HasForeignKey(c => c.CourseTopicId);

            modelBuilder.Entity<CourseTopic>()
                .HasMany(t => t.Tests)
                .WithOne(c => c.CourseTopic)
                .HasForeignKey(c => c.CourseTopicId);
            #endregion

            modelBuilder.Entity<ComplitedTheoryTask>()
                .HasOne(t => t.Task)
                .WithMany(t => t.ComplitedTheoryTasks)
                .HasForeignKey(c => c.TaskId);

            base.OnModelCreating(modelBuilder);
        }

        public virtual DbSet<StudentGroup> StudentGroups { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<UserCourse> UserCourses { get; set; }
        public virtual DbSet<CourseTopic> CourseTopics { get; set; }
        public virtual DbSet<TheoryTask> TheoryTasks { get; set; }
        public virtual DbSet<ComplitedTheoryTask> ComplitedTheoryTasks { get; set; }
        public virtual DbSet<CodeTask> CodeTasks { get; set; }
        public virtual DbSet<ComplitedCodeTask> TheoryTaskCodeTasks { get; set; }
        #region TestTasks
        public virtual DbSet<TestTask> TestTasks { get; set; }
        public virtual DbSet<TestQuestion> TestQuestions { get; set; }
        public virtual DbSet<TestAnswer> TestAnswers { get; set; }
        public virtual DbSet<TestQuestionMaping> TestQuestionMapings { get; set; }
        public virtual DbSet<ComplitedTestQuestion> ComplitedTestQuestions { get; set; }
        public virtual DbSet<ComplitedTestTask> ComplitedTestTasks { get; set; }
        #endregion
    }
}
