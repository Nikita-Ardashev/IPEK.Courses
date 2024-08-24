namespace IPEK.Courses.Server.Domain.Models
{
    public class UserDto
    {
        public string Id { get; set; } = default!;
        public string? Email { get; set; }
        public Guid? GroupId { get; set; }
    }
}
