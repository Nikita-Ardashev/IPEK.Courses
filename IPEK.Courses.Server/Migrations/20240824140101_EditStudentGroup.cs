using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IPEK.Courses.Server.Migrations
{
    /// <inheritdoc />
    public partial class EditStudentGroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GroupName",
                schema: "ipek-course",
                table: "StudentGroups",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                schema: "ipek-course",
                table: "StudentGroups",
                type: "TEXT",
                nullable: true,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                schema: "ipek-course",
                table: "StudentGroups");

            migrationBuilder.RenameColumn(
                name: "Name",
                schema: "ipek-course",
                table: "StudentGroups",
                newName: "GroupName");
        }
    }
}
