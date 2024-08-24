using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Domain.Entities
{
    public class StudentGroup : BaseEntity
    {
        public virtual ICollection<ApplicationUser> Students { get; set; }
    }
}
