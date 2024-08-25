namespace IPEK.Courses.Server.Domain.Entities.BaseEntities
{
    public class BaseEntity
    {
        public required Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
