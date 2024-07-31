namespace IPEK.Courses.Server.Domain.Entities
{
    public class StudentGroup
    {
        public Guid Id { get; set; }
        public required string GroupName { get; set; }
        public virtual ICollection<ApplicationUser> Students { get; set; }
    }
}
