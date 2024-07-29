using IPEK.Courses.Server.Domain.ViewModels.UserModels;

namespace IPEK.Courses.Server.Domain.ViewModels.GroupModels
{
    public class Group
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public virtual required ICollection<User> Students { get; set; }
    }
}
