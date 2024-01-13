using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Question
{
    [Key]
    public int QuestionID {get; set;}

    [Required]
    [Column(TypeName = "nvarchar(200)")]
    public string Content {get; set;} = string.Empty;
}