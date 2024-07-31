using IPEK.Courses.Server.Domain.ViewModels.GroupModels;
using Microsoft.AspNetCore.Identity;

namespace IPEK.Courses.Server.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public Guid? GroupId { get; set; }
        public virtual Group? Group { get; set; }
    }
}
