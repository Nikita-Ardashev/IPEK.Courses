using IPEK.Courses.Server.Models.UserModels;

namespace IPEK.Courses.Server.Models.GroupModels
{
    public class Group
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public virtual required ICollection<User> Students { get; set; }
    }
}
