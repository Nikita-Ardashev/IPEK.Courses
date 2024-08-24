﻿// <auto-generated />
using System;
using IPEK.Courses.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace IPEK.Courses.Server.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    [Migration("20240824140649_EditBaseEntity")]
    partial class EditBaseEntity
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("ipek-course")
                .HasAnnotation("ProductVersion", "8.0.6");

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("GroupId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.CodeTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("CourseTopicId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Task")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<long>("TimeForTask")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CourseTopicId");

                    b.ToTable("CodeTasks", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.ComplitedCodeTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<bool>("Answered")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("AnsweredCorrectly")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("ComplitedOnTimeEnd")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.HasIndex("UserId");

                    b.ToTable("TheoryTaskCodeTasks", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.ComplitedTestQuestion", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<bool>("Answered")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("AnsweredCorrectly")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("ComplitedOnTimeEnd")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.HasIndex("UserId");

                    b.ToTable("ComplitedTestQuestions", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.ComplitedTestTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<bool>("Answered")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("AnsweredCorrectly")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("ComplitedOnTimeEnd")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.HasIndex("UserId");

                    b.ToTable("ComplitedTestTasks", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.ComplitedTheoryTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<bool>("Answered")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("AnsweredCorrectly")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("ComplitedOnTimeEnd")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.HasIndex("UserId");

                    b.ToTable("ComplitedTheoryTasks", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.Course", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("BackgroundImage")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("Icon")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Courses", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.CourseTopic", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("CourseId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("CourseTopics", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.StudentGroup", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("StudentGroups", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TestAnswer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsCorrectAnswer")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("QuestionId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("TestAnswers", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TestQuestion", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("TestQuestions", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TestTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("CourseTopicId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<long>("TimeForTask")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CourseTopicId");

                    b.ToTable("TestTasks", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TestTaskQuestion", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("TestQuestionId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("TestTaskId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("TestQuestionId");

                    b.HasIndex("TestTaskId");

                    b.ToTable("TestQuestionMapings", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TheoryTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("CourseTopicId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CourseTopicId");

                    b.ToTable("TheoryTasks", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.UserCourse", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("CourseId")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("UserId");

                    b.ToTable("UserCourses", "ipek-course");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", "ipek-course");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", "ipek-course");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", "ipek-course");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", "ipek-course");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", "ipek-course");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", "ipek-course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.ApplicationUser", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.StudentGroup", "StudentGroup")
                        .WithMany("Students")
                        .HasForeignKey("GroupId");

                    b.Navigation("StudentGroup");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.CodeTask", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.CourseTopic", "CourseTopic")
                        .WithMany("Codes")
                        .HasForeignKey("CourseTopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CourseTopic");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.ComplitedCodeTask", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.CodeTask", "Task")
                        .WithMany("ComplitedCodeTasks")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("IPEK.Courses.Server.Domain.Entities.ApplicationUser", "ApplicationUser")
                        .WithMany("ComplitedCodeTasks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ApplicationUser");

                    b.Navigation("Task");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.ComplitedTestQuestion", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.TestQuestion", "Task")
                        .WithMany("ComplitedTestQuestions")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("IPEK.Courses.Server.Domain.Entities.ApplicationUser", "ApplicationUser")
                        .WithMany("ComplitedTestQuestions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ApplicationUser");

                    b.Navigation("Task");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.ComplitedTestTask", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.TestTask", "Task")
                        .WithMany("ComplitedTestTasks")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("IPEK.Courses.Server.Domain.Entities.ApplicationUser", "ApplicationUser")
                        .WithMany("ComplitedTestTasks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ApplicationUser");

                    b.Navigation("Task");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.ComplitedTheoryTask", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.TheoryTask", "Task")
                        .WithMany("ComplitedTheoryTasks")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("IPEK.Courses.Server.Domain.Entities.ApplicationUser", "ApplicationUser")
                        .WithMany("ComplitedTheoryTask")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ApplicationUser");

                    b.Navigation("Task");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.CourseTopic", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.Course", "Course")
                        .WithMany("CourseTopics")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TestAnswer", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.TestQuestion", "TestQuestion")
                        .WithMany("TestAnswers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TestQuestion");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TestTask", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.CourseTopic", "CourseTopic")
                        .WithMany("Tests")
                        .HasForeignKey("CourseTopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CourseTopic");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TestTaskQuestion", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.TestQuestion", "Question")
                        .WithMany("TestTaskQuestions")
                        .HasForeignKey("TestQuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("IPEK.Courses.Server.Domain.Entities.TestTask", "Task")
                        .WithMany("TestTaskQuestions")
                        .HasForeignKey("TestTaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Question");

                    b.Navigation("Task");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TheoryTask", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.CourseTopic", "CourseTopic")
                        .WithMany("Theories")
                        .HasForeignKey("CourseTopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CourseTopic");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.UserCourse", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.Course", "Course")
                        .WithMany("UserCourses")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("IPEK.Courses.Server.Domain.Entities.ApplicationUser", "ApplicationUser")
                        .WithMany("UserCourses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ApplicationUser");

                    b.Navigation("Course");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("IPEK.Courses.Server.Domain.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("IPEK.Courses.Server.Domain.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.ApplicationUser", b =>
                {
                    b.Navigation("ComplitedCodeTasks");

                    b.Navigation("ComplitedTestQuestions");

                    b.Navigation("ComplitedTestTasks");

                    b.Navigation("ComplitedTheoryTask");

                    b.Navigation("UserCourses");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.CodeTask", b =>
                {
                    b.Navigation("ComplitedCodeTasks");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.Course", b =>
                {
                    b.Navigation("CourseTopics");

                    b.Navigation("UserCourses");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.CourseTopic", b =>
                {
                    b.Navigation("Codes");

                    b.Navigation("Tests");

                    b.Navigation("Theories");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.StudentGroup", b =>
                {
                    b.Navigation("Students");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TestQuestion", b =>
                {
                    b.Navigation("ComplitedTestQuestions");

                    b.Navigation("TestAnswers");

                    b.Navigation("TestTaskQuestions");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TestTask", b =>
                {
                    b.Navigation("ComplitedTestTasks");

                    b.Navigation("TestTaskQuestions");
                });

            modelBuilder.Entity("IPEK.Courses.Server.Domain.Entities.TheoryTask", b =>
                {
                    b.Navigation("ComplitedTheoryTasks");
                });
#pragma warning restore 612, 618
        }
    }
}
