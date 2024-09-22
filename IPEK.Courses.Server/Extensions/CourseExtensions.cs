using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Models;
namespace IPEK.Courses.Server.Extensions
{
    public static class CourseExtensions
    {
        public static CourseDto ToDto(this Course entity)
        {
            var result = new CourseDto
            {
                Id = entity.Id,
                Icon = entity.Icon,
                BackgroundImage = entity.BackgroundImage,
                Name = entity.Name,
                Description = entity.Description,
                CourseTopics = entity.CourseTopics?.Select(x => x.Id).ToArray(),
            };

            return result;
        }
    }
}
