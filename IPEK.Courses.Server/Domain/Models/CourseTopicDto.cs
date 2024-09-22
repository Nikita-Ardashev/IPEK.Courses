using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Domain.Models
{
    public class CourseTopicDto : BaseEntity
    {
        public Guid CourseId { get; set; }
        public virtual ICollection<Guid>? Tests { get; set; }
        public virtual ICollection<Guid>? Theories { get; set; }
        public virtual ICollection<Guid>? Codes { get; set; }
    }
}
