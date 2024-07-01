using IPEK.Courses.Server.Models.GroupModels;

namespace IPEK.Courses.Server.Models.UserModels
{
    public class User
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Password { get; set; }
        public required Guid GroupId { get; set; }
        public required Group UserGroup { get; set; }
    }
}
