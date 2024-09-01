using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace IPEK.Courses.Server.Extensions
{
    public static class TaskToActionResultExtension
    {
        public static async Task<IActionResult> ToActionResult(this Task task)
        {
			try
			{
				await task.ConfigureAwait(false);
				return new NoContentResult();
			}
			catch (Exception ex)
			{
				return new BadRequestObjectResult(ex);
			}
        }

        public static async Task<ActionResult<TResult>> ToActionResult<TResult>(this Task<TResult> task)
        {
            try
            {
                var result = await task.ConfigureAwait(false);
                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }

        public static async Task Await(this Task task)
        {
            await task.ConfigureAwait(false);
        }

        public static async Task<TResult> Await<TResult>(this Task<TResult> task)
        {
            return await task.ConfigureAwait(false);
        }
    }
}
