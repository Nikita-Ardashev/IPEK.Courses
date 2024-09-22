using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IPEK.Courses.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUserFIO : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsComlited",
                schema: "ipek-course",
                table: "UserCourses",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Answer",
                schema: "ipek-course",
                table: "TheoryTaskCodeTasks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Answer",
                schema: "ipek-course",
                table: "ComplitedTheoryTasks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Answer",
                schema: "ipek-course",
                table: "ComplitedTestTasks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Answer",
                schema: "ipek-course",
                table: "ComplitedTestQuestions",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                schema: "ipek-course",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SecondName",
                schema: "ipek-course",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ThirdName",
                schema: "ipek-course",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsComlited",
                schema: "ipek-course",
                table: "UserCourses");

            migrationBuilder.DropColumn(
                name: "Answer",
                schema: "ipek-course",
                table: "TheoryTaskCodeTasks");

            migrationBuilder.DropColumn(
                name: "Answer",
                schema: "ipek-course",
                table: "ComplitedTheoryTasks");

            migrationBuilder.DropColumn(
                name: "Answer",
                schema: "ipek-course",
                table: "ComplitedTestTasks");

            migrationBuilder.DropColumn(
                name: "Answer",
                schema: "ipek-course",
                table: "ComplitedTestQuestions");

            migrationBuilder.DropColumn(
                name: "FirstName",
                schema: "ipek-course",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SecondName",
                schema: "ipek-course",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ThirdName",
                schema: "ipek-course",
                table: "AspNetUsers");
        }
    }
}
