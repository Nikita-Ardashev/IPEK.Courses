using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IPEK.Courses.Server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "ipek-course");

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BackgroundImage = table.Column<byte[]>(type: "BLOB", nullable: false),
                    Icon = table.Column<byte[]>(type: "BLOB", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StudentGroups",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    GroupName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestQuestions",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestQuestions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "ipek-course",
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseTopics",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CourseId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseTopics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseTopics_Courses_CourseId",
                        column: x => x.CourseId,
                        principalSchema: "ipek-course",
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    GroupId = table.Column<Guid>(type: "TEXT", nullable: true),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_StudentGroups_GroupId",
                        column: x => x.GroupId,
                        principalSchema: "ipek-course",
                        principalTable: "StudentGroups",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TestAnswers",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Answer = table.Column<string>(type: "TEXT", nullable: false),
                    IsCorrectAnswer = table.Column<bool>(type: "INTEGER", nullable: false),
                    QuestionId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestAnswers_TestQuestions_QuestionId",
                        column: x => x.QuestionId,
                        principalSchema: "ipek-course",
                        principalTable: "TestQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CodeTasks",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TimeForTask = table.Column<long>(type: "INTEGER", nullable: false),
                    Content = table.Column<string>(type: "TEXT", nullable: false),
                    Task = table.Column<string>(type: "TEXT", nullable: false),
                    Answer = table.Column<string>(type: "TEXT", nullable: false),
                    CourseTopicId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CodeTasks_CourseTopics_CourseTopicId",
                        column: x => x.CourseTopicId,
                        principalSchema: "ipek-course",
                        principalTable: "CourseTopics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestTasks",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TimeForTask = table.Column<long>(type: "INTEGER", nullable: false),
                    CourseTopicId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestTasks_CourseTopics_CourseTopicId",
                        column: x => x.CourseTopicId,
                        principalSchema: "ipek-course",
                        principalTable: "CourseTopics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TheoryTasks",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Content = table.Column<string>(type: "TEXT", nullable: false),
                    CourseTopicId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TheoryTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TheoryTasks_CourseTopics_CourseTopicId",
                        column: x => x.CourseTopicId,
                        principalSchema: "ipek-course",
                        principalTable: "CourseTopics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "ipek-course",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                schema: "ipek-course",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "ipek-course",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                schema: "ipek-course",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "ipek-course",
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "ipek-course",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                schema: "ipek-course",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "ipek-course",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ComplitedTestQuestions",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ComplitedOnTimeEnd = table.Column<bool>(type: "INTEGER", nullable: false),
                    Answered = table.Column<bool>(type: "INTEGER", nullable: false),
                    AnsweredCorrectly = table.Column<bool>(type: "INTEGER", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    TaskId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComplitedTestQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ComplitedTestQuestions_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "ipek-course",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComplitedTestQuestions_TestQuestions_TaskId",
                        column: x => x.TaskId,
                        principalSchema: "ipek-course",
                        principalTable: "TestQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserCourses",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CourseId = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCourses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserCourses_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "ipek-course",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCourses_Courses_CourseId",
                        column: x => x.CourseId,
                        principalSchema: "ipek-course",
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TheoryTaskCodeTasks",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ComplitedOnTimeEnd = table.Column<bool>(type: "INTEGER", nullable: false),
                    Answered = table.Column<bool>(type: "INTEGER", nullable: false),
                    AnsweredCorrectly = table.Column<bool>(type: "INTEGER", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    TaskId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TheoryTaskCodeTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TheoryTaskCodeTasks_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "ipek-course",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TheoryTaskCodeTasks_CodeTasks_TaskId",
                        column: x => x.TaskId,
                        principalSchema: "ipek-course",
                        principalTable: "CodeTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ComplitedTestTasks",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ComplitedOnTimeEnd = table.Column<bool>(type: "INTEGER", nullable: false),
                    Answered = table.Column<bool>(type: "INTEGER", nullable: false),
                    AnsweredCorrectly = table.Column<bool>(type: "INTEGER", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    TaskId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComplitedTestTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ComplitedTestTasks_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "ipek-course",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComplitedTestTasks_TestTasks_TaskId",
                        column: x => x.TaskId,
                        principalSchema: "ipek-course",
                        principalTable: "TestTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestQuestionMapings",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TestQuestionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    TestTaskId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestQuestionMapings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestQuestionMapings_TestQuestions_TestQuestionId",
                        column: x => x.TestQuestionId,
                        principalSchema: "ipek-course",
                        principalTable: "TestQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TestQuestionMapings_TestTasks_TestTaskId",
                        column: x => x.TestTaskId,
                        principalSchema: "ipek-course",
                        principalTable: "TestTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ComplitedTheoryTasks",
                schema: "ipek-course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ComplitedOnTimeEnd = table.Column<bool>(type: "INTEGER", nullable: false),
                    Answered = table.Column<bool>(type: "INTEGER", nullable: false),
                    AnsweredCorrectly = table.Column<bool>(type: "INTEGER", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    TaskId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComplitedTheoryTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ComplitedTheoryTasks_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "ipek-course",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComplitedTheoryTasks_TheoryTasks_TaskId",
                        column: x => x.TaskId,
                        principalSchema: "ipek-course",
                        principalTable: "TheoryTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                schema: "ipek-course",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                schema: "ipek-course",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                schema: "ipek-course",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                schema: "ipek-course",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                schema: "ipek-course",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                schema: "ipek-course",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_GroupId",
                schema: "ipek-course",
                table: "AspNetUsers",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                schema: "ipek-course",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CodeTasks_CourseTopicId",
                schema: "ipek-course",
                table: "CodeTasks",
                column: "CourseTopicId");

            migrationBuilder.CreateIndex(
                name: "IX_ComplitedTestQuestions_TaskId",
                schema: "ipek-course",
                table: "ComplitedTestQuestions",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_ComplitedTestQuestions_UserId",
                schema: "ipek-course",
                table: "ComplitedTestQuestions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ComplitedTestTasks_TaskId",
                schema: "ipek-course",
                table: "ComplitedTestTasks",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_ComplitedTestTasks_UserId",
                schema: "ipek-course",
                table: "ComplitedTestTasks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ComplitedTheoryTasks_TaskId",
                schema: "ipek-course",
                table: "ComplitedTheoryTasks",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_ComplitedTheoryTasks_UserId",
                schema: "ipek-course",
                table: "ComplitedTheoryTasks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseTopics_CourseId",
                schema: "ipek-course",
                table: "CourseTopics",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_TestAnswers_QuestionId",
                schema: "ipek-course",
                table: "TestAnswers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_TestQuestionMapings_TestQuestionId",
                schema: "ipek-course",
                table: "TestQuestionMapings",
                column: "TestQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_TestQuestionMapings_TestTaskId",
                schema: "ipek-course",
                table: "TestQuestionMapings",
                column: "TestTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TestTasks_CourseTopicId",
                schema: "ipek-course",
                table: "TestTasks",
                column: "CourseTopicId");

            migrationBuilder.CreateIndex(
                name: "IX_TheoryTaskCodeTasks_TaskId",
                schema: "ipek-course",
                table: "TheoryTaskCodeTasks",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TheoryTaskCodeTasks_UserId",
                schema: "ipek-course",
                table: "TheoryTaskCodeTasks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TheoryTasks_CourseTopicId",
                schema: "ipek-course",
                table: "TheoryTasks",
                column: "CourseTopicId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCourses_CourseId",
                schema: "ipek-course",
                table: "UserCourses",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCourses_UserId",
                schema: "ipek-course",
                table: "UserCourses",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "ComplitedTestQuestions",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "ComplitedTestTasks",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "ComplitedTheoryTasks",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "TestAnswers",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "TestQuestionMapings",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "TheoryTaskCodeTasks",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "UserCourses",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "AspNetRoles",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "TheoryTasks",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "TestQuestions",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "TestTasks",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "CodeTasks",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "AspNetUsers",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "CourseTopics",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "StudentGroups",
                schema: "ipek-course");

            migrationBuilder.DropTable(
                name: "Courses",
                schema: "ipek-course");
        }
    }
}
