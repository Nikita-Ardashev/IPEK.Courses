using IPEK.Courses.Server.Models.GroupModels;
using IPEK.Courses.Server.Models.UserModels;
using Microsoft.EntityFrameworkCore;

namespace IPEK.Courses.Server.Data
{
    public class CoursesContext : DbContext
    {
        public CoursesContext(DbContextOptions<CoursesContext> dbContextOptions)
            : base(dbContextOptions)
        {
#if DEBUG
            Database.EnsureCreated();
#endif
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlite("Data Source=IpekCourses.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>();
        }

        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<User> Users { get; set; }
    }
}
