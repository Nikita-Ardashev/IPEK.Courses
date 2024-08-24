namespace IPEK.Courses.Server.Domain.Constants
{
    public static class RoleNames
    {
        public static string[] Roles = new[] {AdminRoleName, TeacherRoleName, StudentRoleName};

        public const string AdminRoleName = "Admin";
        public const string TeacherRoleName = "Teacher";
        public const string StudentRoleName = "Student";
    }
}
