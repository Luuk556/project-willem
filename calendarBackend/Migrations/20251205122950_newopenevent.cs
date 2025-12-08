using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class newopenevent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Description", "EndDate", "IsOpen", "OrganizerId", "RoomId", "RoomId1", "StartDate", "Title" },
                values: new object[] { 8, "", new DateTime(2025, 10, 3, 20, 30, 0, 0, DateTimeKind.Unspecified), true, 1, 9, null, new DateTime(2025, 10, 3, 19, 30, 0, 0, DateTimeKind.Unspecified), "Ping pong" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: 8);
        }
    }
}
