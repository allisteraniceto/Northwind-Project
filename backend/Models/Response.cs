using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Response
{
    public string formType {get; set;} = string.Empty;

    public string inputString {get; set;} = string.Empty;

    public int questionNum {get; set;}

}