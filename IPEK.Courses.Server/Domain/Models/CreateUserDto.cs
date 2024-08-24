namespace IPEK.Courses.Server.Domain.Models
{
    public class CreateUserDto : UserDto
    {
        public string Password { get; set; }
        public string RoleName { get; set; }
    }
}
