using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IPEK.Courses.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationUserToRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoleId",
                schema: "ipek-course",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_RoleId",
                schema: "ipek-course",
                table: "AspNetUsers",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_RoleId",
                schema: "ipek-course",
                table: "AspNetUsers",
                column: "RoleId",
                principalSchema: "ipek-course",
                principalTable: "AspNetRoles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_RoleId",
                schema: "ipek-course",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_RoleId",
                schema: "ipek-course",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RoleId",
                schema: "ipek-course",
                table: "AspNetUsers");
        }
    }
}
