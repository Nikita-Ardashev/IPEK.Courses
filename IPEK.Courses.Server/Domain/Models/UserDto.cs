using IPEK.Courses.Server.Domain.Entities;

namespace IPEK.Courses.Server.Domain.Models
{
    public class UserDto
    {
        public string Id { get; set; } = default!;
        public string? Fullname { get; set; }
        public string? Email { get; set; }
        public string? RoleName { get; set; }
        public string[]? AssignedCourseIds { get; set; }
        public string[]? CompletedCourseIds { get; set; }
        public Guid? GroupId { get; set; }
        public GroupDto? Group { get; set; }
    }
}
