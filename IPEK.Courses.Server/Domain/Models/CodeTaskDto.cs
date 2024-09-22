using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Domain.Models
{
    public class CodeTaskDto : BaseEntity
    {
        public long TimeForTask { get; set; }
        public string Task { get; set; }
    }
}
