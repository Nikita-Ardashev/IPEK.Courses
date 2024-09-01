using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
namespace IPEK.Courses.Server.Extensions
{
    public static class CourseExtensions
    {
        public static CourseDto ToDto(this Course entity, bool includeChildsDto = false)
        {
            var result = new CourseDto
            {
                Id = entity.Id,
                Icon = entity.Icon.ToArray(),
                BackgroundImage = entity.BackgroundImage.ToArray(),
                Name = entity.Name,
                Description = entity.Description                
            };
            if (includeChildsDto)
            {
                result.CourseTopics = entity.CourseTopics?.Select(x => x.ToDto(true)).ToArray();
                result.UserCourses = entity.UserCourses?.ToArray();
            }
            return result;
        }
    }
}
