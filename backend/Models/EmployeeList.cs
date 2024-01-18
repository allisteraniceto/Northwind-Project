using System.Text.Json.Serialization;
public class EmployeeList
{
    [JsonPropertyName("employees")]
    public List<Employee> Employees { get; set; }
}