using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IPEK.Courses.Server.Migrations
{
    /// <inheritdoc />
    public partial class EditCourseBackground : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BackgroundImage",
                schema: "ipek-course",
                table: "Courses");

            migrationBuilder.AddColumn<string>(
                name: "BackgroundColorCode",
                schema: "ipek-course",
                table: "Courses",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BackgroundColorCode",
                schema: "ipek-course",
                table: "Courses");

            migrationBuilder.AddColumn<byte[]>(
                name: "BackgroundImage",
                schema: "ipek-course",
                table: "Courses",
                type: "BLOB",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
