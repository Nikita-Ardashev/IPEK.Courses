using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Domain.Models
{
    public class CourseDto : BaseEntity
    {
        public string BackgroundColorCode { get; set; }
        public byte[] Icon { get; set; }
        public virtual ICollection<Guid>? CourseTopics { get; set; }
        public bool Complited { get; set; }
    }
}
