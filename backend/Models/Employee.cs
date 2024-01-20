using System.Text.Json.Serialization;

public class Employee
{
    [JsonPropertyName("employee_id")]
    public int HID {get; set;}

    [JsonPropertyName("first_name")]
    public string FirstName {get; set;} = string.Empty;

    [JsonPropertyName("last_name")]
    public string LastName {get; set;} = string.Empty;

    [JsonPropertyName("email")]
    public string Email {get; set;} = string.Empty;

    [JsonPropertyName("job_title")]
    public string Position {get; set;} = string.Empty;

    [JsonPropertyName("manager_id")]
    public int ManagerID {get; set;}
}