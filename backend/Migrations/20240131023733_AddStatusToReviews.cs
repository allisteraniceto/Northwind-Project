using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddStatusToReviews : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Reviews",
                type: "nvarchar(25)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(15)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Reviews",
                type: "nvarchar(15)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(25)");
        }
    }
}
