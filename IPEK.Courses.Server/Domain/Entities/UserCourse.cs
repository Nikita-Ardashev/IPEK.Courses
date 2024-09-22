using IPEK.Courses.Server.Domain.Entities.BaseEntities;

namespace IPEK.Courses.Server.Domain.Entities
{
    public class UserCourse : BaseEntity
    {
        public Guid CourseId { get; set; }
        public virtual Course Course { get; set; }
        public string UserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public bool IsComlited { get; set; }
    }
}
