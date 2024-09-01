using Microsoft.AspNetCore.Identity;

namespace IPEK.Courses.Server.Domain.Entities
{
    public class ApplicationRole : IdentityRole
    {
        public virtual ICollection<ApplicationUser> Users { get; set; }
    }
}
