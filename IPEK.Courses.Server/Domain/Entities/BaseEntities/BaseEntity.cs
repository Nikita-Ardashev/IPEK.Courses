namespace IPEK.Courses.Server.Domain.Entities.BaseEntities
{
    public class BaseEntity: ICloneable
    {
        public required Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}
