namespace IPEK.Courses.Server.Domain.Models
{
    public class UserDto
    {
        public string Id { get; set; } = default!;
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string ThirdName { get; set; }
        public string? Email { get; set; }
        public string? RoleName { get; set; }
        public ICollection<Guid>? CourseIds { get; set; }
        public Guid? GroupId { get; set; }
    }
}
