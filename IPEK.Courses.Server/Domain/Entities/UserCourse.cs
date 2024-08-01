namespace IPEK.Courses.Server.Domain.Entities
{
    public class UserCourse
    {
        public Guid Id { get; set; }
        public Guid CourseId { get; set; }
        public virtual Course Course { get; set; }
        public Guid UserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
