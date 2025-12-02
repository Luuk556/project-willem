using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Attendances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoomId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attendances", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EventAttendees",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    EventId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventAttendees", x => new { x.EventId, x.UserId });
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    RoomId = table.Column<int>(type: "INTEGER", nullable: false),
                    StartDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    OrganizerId = table.Column<int>(type: "INTEGER", nullable: false),
                    IsOpen = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Capacity = table.Column<int>(type: "INTEGER", nullable: false),
                    SizeX = table.Column<int>(type: "INTEGER", nullable: false),
                    SizeY = table.Column<int>(type: "INTEGER", nullable: false),
                    PositionX = table.Column<int>(type: "INTEGER", nullable: false),
                    PositionY = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    Biography = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<int>(type: "INTEGER", nullable: false),
                    ProfilePicture = table.Column<byte[]>(type: "BLOB", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "EventAttendees",
                columns: new[] { "EventId", "UserId" },
                values: new object[,]
                {
                    { 1, 3 },
                    { 1, 4 },
                    { 1, 5 },
                    { 2, 3 },
                    { 2, 4 },
                    { 2, 5 },
                    { 3, 3 },
                    { 3, 4 },
                    { 3, 5 },
                    { 4, 0 },
                    { 4, 1 },
                    { 4, 2 },
                    { 5, 0 },
                    { 5, 1 },
                    { 5, 2 }
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Description", "EndDate", "IsOpen", "OrganizerId", "RoomId", "StartDate", "Title" },
                values: new object[,]
                {
                    { 2, "Long daily standup description so i can test how it would look if the description of this event is long.", new DateTime(2025, 10, 3, 11, 30, 0, 0, DateTimeKind.Unspecified), false, 1, 9, new DateTime(2025, 10, 3, 11, 0, 0, 0, DateTimeKind.Unspecified), "Daily standup" },
                    { 3, "Call with product owner", new DateTime(2025, 10, 3, 15, 45, 0, 0, DateTimeKind.Unspecified), false, 1, 8, new DateTime(2025, 10, 3, 15, 0, 0, 0, DateTimeKind.Unspecified), "P.O. meeting" },
                    { 4, "Call with product owner", new DateTime(2025, 10, 3, 16, 30, 0, 0, DateTimeKind.Unspecified), false, 1, 8, new DateTime(2025, 10, 3, 15, 30, 0, 0, DateTimeKind.Unspecified), "P.O. meeting part 2" },
                    { 5, "Call with product owner", new DateTime(2025, 10, 3, 17, 30, 0, 0, DateTimeKind.Unspecified), false, 1, 8, new DateTime(2025, 10, 3, 16, 30, 0, 0, DateTimeKind.Unspecified), "P.O. meeting part 3" },
                    { 6, "Daily standup description", new DateTime(2025, 10, 4, 11, 30, 0, 0, DateTimeKind.Unspecified), false, 1, 9, new DateTime(2025, 10, 4, 11, 0, 0, 0, DateTimeKind.Unspecified), "Daily standup" },
                    { 7, "Lunch in canteen", new DateTime(2025, 10, 4, 13, 15, 0, 0, DateTimeKind.Unspecified), true, 1, 0, new DateTime(2025, 10, 4, 12, 30, 0, 0, DateTimeKind.Unspecified), "Lunch" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Biography", "Email", "Name", "Password", "ProfilePicture", "Role" },
                values: new object[] { 1, "biography", "John@gmail.com", "John", "password", null, 0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attendances");

            migrationBuilder.DropTable(
                name: "EventAttendees");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
