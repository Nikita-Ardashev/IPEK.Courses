using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.ViewModels.UserModels;
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
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>();
        }

        public virtual DbSet<StudentGroup> StudentGroups { get; set; }
    }
}
