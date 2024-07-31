namespace IPEK.Courses.Server.Domain.Entities
{
    public class BaseEntity
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; }
    }
}
