using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddedHIDColumnToRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Event",
                table: "Appointments");

            migrationBuilder.AddColumn<string>(
                name: "HID",
                table: "Ratings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HID",
                table: "Ratings");

            migrationBuilder.AddColumn<string>(
                name: "Event",
                table: "Appointments",
                type: "nvarchar(200)",
                nullable: false,
                defaultValue: "");
        }
    }
}
