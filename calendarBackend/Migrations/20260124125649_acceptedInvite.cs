using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class acceptedInvite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AcceptedInvite",
                table: "EventAttendees",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 1, 1 },
                column: "AcceptedInvite",
                value: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 1, 2 },
                column: "AcceptedInvite",
                value: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 1, 3 },
                column: "AcceptedInvite",
                value: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 2, 1 },
                column: "AcceptedInvite",
                value: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 3, 1 },
                column: "AcceptedInvite",
                value: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 3, 3 },
                column: "AcceptedInvite",
                value: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 4, 1 },
                column: "AcceptedInvite",
                value: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 4, 2 },
                column: "AcceptedInvite",
                value: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 4, 3 },
                column: "AcceptedInvite",
                value: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 5, 1 },
                column: "AcceptedInvite",
                value: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 5, 2 },
                column: "AcceptedInvite",
                value: false);

            migrationBuilder.UpdateData(
                table: "EventAttendees",
                keyColumns: new[] { "EventId", "UserId" },
                keyValues: new object[] { 5, 3 },
                column: "AcceptedInvite",
                value: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AcceptedInvite",
                table: "EventAttendees");
        }
    }
}
