using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Extensions;
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

        public async Task<GroupDto> GetGroupById(Guid id)
        {
            var studentGroup = await _studentGroupRepository.GetByIdAsync(id);
            return studentGroup.ToDto();
        }
    }
}
