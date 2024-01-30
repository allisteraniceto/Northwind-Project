using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Response
{
    public int QuestionID {get; set;}
    public string Content {get; set;} = string.Empty;

}