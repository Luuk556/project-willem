using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateTable(
                name: "Attendances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoomId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    StartDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attendances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attendances_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Attendances_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    IsOpen = table.Column<bool>(type: "INTEGER", nullable: false),
                    RoomId1 = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Events_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Events_Rooms_RoomId1",
                        column: x => x.RoomId1,
                        principalTable: "Rooms",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Events_Users_OrganizerId",
                        column: x => x.OrganizerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EventAttendees",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    EventId = table.Column<int>(type: "INTEGER", nullable: false),
                    AcceptedInvite = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventAttendees", x => new { x.EventId, x.UserId });
                    table.ForeignKey(
                        name: "FK_EventAttendees_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventAttendees_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "Id", "Capacity", "Name", "PositionX", "PositionY", "SizeX", "SizeY" },
                values: new object[,]
                {
                    { 1, 10, "Canteen", 65, 10, 25, 25 },
                    { 2, 10, "Entrance Hall", 35, 10, 30, 40 },
                    { 3, 10, "Kitchen", 65, 35, 25, 15 },
                    { 4, 10, "Room 001", 15, 10, 20, 10 },
                    { 5, 10, "Room 002", 15, 20, 5, 35 },
                    { 6, 10, "Room 003", 25, 25, 10, 25 },
                    { 7, 10, "Room 004", 15, 55, 25, 10 },
                    { 8, 10, "Room 005", 45, 55, 30, 10 },
                    { 9, 10, "Room 006", 75, 50, 15, 15 },
                    { 10, 10, "Room 007", 25, 65, 15, 10 },
                    { 11, 10, "Room 008", 45, 65, 15, 10 },
                    { 12, 10, "Room 009", 25, 75, 35, 10 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Biography", "Email", "Name", "Password", "ProfilePicture", "Role" },
                values: new object[,]
                {
                    { 1, "biography", "John@gmail.com", "John", "password", null, 0 },
                    { 2, "biography", "Kees@gmail.com", "Kees", "password", null, 0 },
                    { 3, "biography", "Jan@gmail.com", "Jan", "password", null, 0 }
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Description", "EndDate", "IsOpen", "OrganizerId", "RoomId", "RoomId1", "StartDate", "Title" },
                values: new object[,]
                {
                    { 1, "Long daily standup description so i can test how it would look if the description of this event is long.", new DateTime(2025, 10, 5, 15, 30, 0, 0, DateTimeKind.Unspecified), false, 1, 10, null, new DateTime(2025, 10, 5, 15, 0, 0, 0, DateTimeKind.Unspecified), "Daily standup" },
                    { 2, "Long daily standup description so i can test how it would look if the description of this event is long.", new DateTime(2025, 10, 3, 11, 30, 0, 0, DateTimeKind.Unspecified), false, 1, 10, null, new DateTime(2025, 10, 3, 11, 0, 0, 0, DateTimeKind.Unspecified), "Daily standup" },
                    { 3, "Call with product owner", new DateTime(2025, 10, 3, 15, 45, 0, 0, DateTimeKind.Unspecified), false, 1, 9, null, new DateTime(2025, 10, 3, 15, 0, 0, 0, DateTimeKind.Unspecified), "P.O. meeting" },
                    { 4, "Call with product owner", new DateTime(2025, 10, 3, 16, 30, 0, 0, DateTimeKind.Unspecified), false, 1, 9, null, new DateTime(2025, 10, 3, 15, 30, 0, 0, DateTimeKind.Unspecified), "P.O. meeting part 2" },
                    { 5, "Call with product owner", new DateTime(2025, 10, 3, 17, 30, 0, 0, DateTimeKind.Unspecified), false, 1, 9, null, new DateTime(2025, 10, 3, 16, 30, 0, 0, DateTimeKind.Unspecified), "P.O. meeting part 3" },
                    { 6, "Daily standup description", new DateTime(2025, 10, 4, 11, 30, 0, 0, DateTimeKind.Unspecified), false, 1, 10, null, new DateTime(2025, 10, 4, 11, 0, 0, 0, DateTimeKind.Unspecified), "Daily standup" },
                    { 7, "Lunch in canteen", new DateTime(2025, 10, 4, 13, 15, 0, 0, DateTimeKind.Unspecified), true, 1, 1, null, new DateTime(2025, 10, 4, 12, 30, 0, 0, DateTimeKind.Unspecified), "Lunch" },
                    { 8, "", new DateTime(2025, 10, 3, 20, 30, 0, 0, DateTimeKind.Unspecified), true, 1, 9, null, new DateTime(2025, 10, 3, 19, 30, 0, 0, DateTimeKind.Unspecified), "Ping pong" }
                });

            migrationBuilder.InsertData(
                table: "EventAttendees",
                columns: new[] { "EventId", "UserId", "AcceptedInvite" },
                values: new object[,]
                {
                    { 1, 1, false },
                    { 1, 2, false },
                    { 1, 3, false },
                    { 2, 1, false },
                    { 3, 1, false },
                    { 3, 3, false },
                    { 4, 1, false },
                    { 4, 2, false },
                    { 4, 3, false },
                    { 5, 1, false },
                    { 5, 2, false },
                    { 5, 3, false }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attendances_RoomId",
                table: "Attendances",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_Attendances_UserId",
                table: "Attendances",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EventAttendees_UserId",
                table: "EventAttendees",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_OrganizerId",
                table: "Events",
                column: "OrganizerId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_RoomId",
                table: "Events",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_RoomId1",
                table: "Events",
                column: "RoomId1");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Name",
                table: "Users",
                column: "Name",
                unique: true);
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
