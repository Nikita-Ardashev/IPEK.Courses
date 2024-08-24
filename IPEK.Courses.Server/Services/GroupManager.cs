using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;

namespace IPEK.Courses.Server.Services
{
    public class GroupManager
    {
        private readonly IRepository<StudentGroup> _studentGroupRepository;

        public GroupManager(IRepository<StudentGroup> studentGroupRepository)
        {
            _studentGroupRepository = studentGroupRepository;
        }
    }
}
