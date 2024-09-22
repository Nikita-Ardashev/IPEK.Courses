using IPEK.Courses.Server.Data;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Extensions;
using Microsoft.EntityFrameworkCore;

namespace IPEK.Courses.Server.Services
{
    public class GroupManager(UserManagerExtended userManager, ApplicationDBContext context)
    {
        public async Task<GroupDto> CreateGroupWithStudents(string groupName, CreateUserDto[] users)
        {
            var group = await GetByName(groupName) ?? await CreateByName(groupName);
            group.UserIds = [];

            foreach (var user in users)
            {
                user.GroupId = group.Id;
                var createdUSerId = await userManager.CreateUserAsync(user);
                group.UserIds.Add(createdUSerId);
            }

            return group;
        }

        public async Task<GroupDto> CreateByName(string groupName)
        {
            var studentGroup = new StudentGroup
            {
                Id = Guid.NewGuid(),
                Name = groupName,
            };

            await context.AddAsync(studentGroup);
            await context.SaveChangesAsync();

            return studentGroup.ToDto();
        }

        public async Task<GroupDto?> GetByName(string groupName)
        {
            var studentGroup = await context.StudentGroups.FirstOrDefaultAsync(x => x.Name == groupName);
            return studentGroup?.ToDto();
        }
    }
}
