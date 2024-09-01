using IPEK.Courses.Server.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IPEK.Courses.Server.Data
{
    public class ApplicationDBContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> dbContextOptions)
            : base(dbContextOptions)
        {
#if DEBUG
            //Database.EnsureCreated();
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
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasDefaultSchema("ipek-course");

            ConfigureUser(modelBuilder);
            ConfigureCourseTopic(modelBuilder);
            ConfigureUserCourse(modelBuilder);
            ConfigureTasks(modelBuilder);
        }

        private static void ConfigureTasks(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestTaskQuestion>()
                .IgnoreNameAndDescription()
                .HasOne(tqm => tqm.Question)
                .WithMany(tq => tq.TestTaskQuestions)
                .HasForeignKey(tqm => tqm.TestQuestionId);

            modelBuilder.Entity<TestTaskQuestion>()
                .HasOne(tqm => tqm.Task)
                .WithMany(tt => tt.TestTaskQuestions)
                .HasForeignKey(tqm => tqm.TestTaskId);

            modelBuilder.Entity<TestAnswer>()
                .IgnoreNameAndDescription()
                .HasOne(ta => ta.TestQuestion)
                .WithMany(tq => tq.TestAnswers)
                .HasForeignKey(ta => ta.QuestionId);

            modelBuilder.Entity<ComplitedTestTask>()
                .IgnoreNameAndDescription()
                .HasOne(ctt => ctt.Task)
                .WithMany(tt => tt.ComplitedTestTasks)
                .HasForeignKey(ctt => ctt.TaskId);

            modelBuilder.Entity<ComplitedTestQuestion>()
                .IgnoreNameAndDescription()
                .HasOne(ctt => ctt.Task)
                .WithMany(tq => tq.ComplitedTestQuestions)
                .HasForeignKey(ta => ta.TaskId);

            modelBuilder.Entity<ComplitedCodeTask>()
                .IgnoreNameAndDescription()
                .HasOne(cct => cct.Task)
                .WithMany(ct => ct.ComplitedCodeTasks)
                .HasForeignKey(cct => cct.TaskId);

            modelBuilder.Entity<ComplitedTheoryTask>()
                .IgnoreNameAndDescription()
                .HasOne(ctt => ctt.Task)
                .WithMany(tt => tt.ComplitedTheoryTasks)
                .HasForeignKey(ta => ta.TaskId);
        }

        private static void ConfigureUserCourse(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserCourse>()
                .IgnoreNameAndDescription()
                .HasOne(uc => uc.ApplicationUser)
                .WithMany(au => au.UserCourses)
                .HasForeignKey(uc => uc.UserId);

            modelBuilder.Entity<UserCourse>()
                .HasOne(uc => uc.Course)
                .WithMany(c => c.UserCourses)
                .HasForeignKey(uc => uc.CourseId);
        }

        private static void ConfigureCourseTopic(ModelBuilder modelBuilder)
        {
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
        }

        private static void ConfigureUser(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationUser>()
                .HasOne(a => a.StudentGroup)
                .WithMany(a => a.Students)
                .HasForeignKey(a => a.GroupId);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(a => a.ComplitedTheoryTask)
                .WithOne(u => u.ApplicationUser)
                .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(a => a.ComplitedCodeTasks)
                .WithOne(u => u.ApplicationUser)
                .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(a => a.ComplitedTestTasks)
                .WithOne(u => u.ApplicationUser)
                .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(a => a.ComplitedTestQuestions)
                .WithOne(u => u.ApplicationUser)
                .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<ApplicationUser>()
                .HasOne(a => a.Role)
                .WithMany(u => u.Users)
                .HasForeignKey(c => c.RoleId);
        }

        public virtual DbSet<StudentGroup> StudentGroups { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<UserCourse> UserCourses { get; set; }
        public virtual DbSet<CourseTopic> CourseTopics { get; set; }
        public virtual DbSet<TheoryTask> TheoryTasks { get; set; }
        public virtual DbSet<ComplitedTheoryTask> ComplitedTheoryTasks { get; set; }
        public virtual DbSet<CodeTask> CodeTasks { get; set; }
        public virtual DbSet<ComplitedCodeTask> TheoryTaskCodeTasks { get; set; }
        public virtual DbSet<TestTask> TestTasks { get; set; }
        public virtual DbSet<TestQuestion> TestQuestions { get; set; }
        public virtual DbSet<TestAnswer> TestAnswers { get; set; }
        public virtual DbSet<TestTaskQuestion> TestQuestionMapings { get; set; }
        public virtual DbSet<ComplitedTestQuestion> ComplitedTestQuestions { get; set; }
        public virtual DbSet<ComplitedTestTask> ComplitedTestTasks { get; set; }
    }
}
