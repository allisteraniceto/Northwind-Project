using System.Text.Json;

public static class IdentityService
{
    public static void ObtainIdentity()
    {
        var jsonString = "{\"FirstName\":\"Terry\",\"LastName\":\"Goggey\",\"Email\":\"tgoggey5@google.com.hk\",\"HID\": 6, \"ManagerHID\": 1, \"Role\":\"Employee\"}";

        Globals.IdentityJsonString = jsonString;
        Globals.UserIdentity = JsonSerializer.Deserialize<Identity>(jsonString);
        Globals.SelectedEmployeeHID = Globals.UserIdentity.HID;
    }
}