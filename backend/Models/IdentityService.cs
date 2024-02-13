using System.Text.Json;

public static class IdentityService
{
    public static void ObtainIdentity()
    {
        var jsonString = "{\"FirstName\":\"Mark\",\"LastName\":\"Kneblik\",\"Email\":\"markkneblik@gmail.com\",\"HID\": 25, \"ManagerHID\": 3, \"Role\":\"Employee\"}";

        Globals.IdentityJsonString = jsonString;
        Globals.UserIdentity = JsonSerializer.Deserialize<Identity>(jsonString);
    }
}