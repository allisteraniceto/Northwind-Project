using System.Text.Json;

public static class IdentityService
{
    public static void ObtainIdentity()
    {
        var jsonString = "{\"FirstName\":\"Cordi\",\"LastName\":\"Brooke\",\"Email\":\"cbrookes@amazonaws.com\",\"HID\": 29, \"ManagerHID\": 2, \"Role\":\"Employee\"}";

        Globals.IdentityJsonString = jsonString;
        Globals.UserIdentity = JsonSerializer.Deserialize<Identity>(jsonString);
        Globals.SelectedEmployeeHID = Globals.UserIdentity.HID;
    }
}