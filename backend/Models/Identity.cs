public class Identity
{
    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public int HID { get; set; }

    public int ManagerHID { get; set; }

    public string Role { get; set; } = string.Empty;
}