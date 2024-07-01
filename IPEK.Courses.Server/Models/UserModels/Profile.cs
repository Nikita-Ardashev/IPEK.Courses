namespace IPEK.Courses.Server.Models.UserModels
{
    public class Profile : User
    {
        public bool IsTeacher { get; set; } = false;
        public bool IsAdmin { get; set; } = false;
        public string? GroupName { get; set; }
    }
}