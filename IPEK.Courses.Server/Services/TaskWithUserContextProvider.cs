using IPEK.Courses.Server.Data;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Domain.Entities.BaseEntities;
using IPEK.Courses.Server.Domain.Models;
using IPEK.Courses.Server.Extensions;
using IPEK.Courses.Server.Interfaces;

namespace IPEK.Courses.Server.Services
{
    public class TaskWithUserContextProvider(IServiceProvider serviceProvider) : ITaskWithUserContextProvider
    {
        public async Task<TaskWithUserContext<TDto>> GetUserContextAsync<TEntity, TDto>(Guid entityId, string userId)
            where TEntity : BaseEntity
            where TDto : class
        {
            var repository = serviceProvider.GetRequiredService<IRepository<TEntity>>();
            var task = await repository.GetByIdAsync(entityId) ?? throw new Exception("Not found code task");
            var taskDto = (TDto)task.ToDto();
            var complitedTask = GetComplitedTaskFromEntity(userId, task);

            var taskWithUserContext = new TaskWithUserContext<TDto>
            {
                Dto = taskDto,
                Answer = complitedTask?.Answer,
                IsComplited = complitedTask?.Answered,
                AnsweredCorrectly = complitedTask?.AnsweredCorrectly,
                // TODO: добавить провайдер для подсчета оставшегося времени по заданию
                TimeElapsed = null,
            };
            throw new NotImplementedException();
        }

        private static BaseComplitedTask? GetComplitedTaskFromEntity<TEntity>(string userId, TEntity task) where TEntity : BaseEntity
        {
            return task switch
            {
                CodeTask codeTask => codeTask.ComplitedCodeTasks?.FirstOrDefault(x => x.UserId == userId),
                TestTask testTask => testTask.ComplitedTestTasks?.FirstOrDefault(x => x.UserId == userId),
                TheoryTask theoryTask => theoryTask.ComplitedTheoryTasks?.FirstOrDefault(x => x.UserId == userId),
                TestQuestion testQuestion => testQuestion.ComplitedTestQuestions?.FirstOrDefault(x => x.UserId == userId),
                 _ => throw new NotSupportedException($"Entity is not task: {task.GetType().FullName}"),
            };
        }
    }
}
