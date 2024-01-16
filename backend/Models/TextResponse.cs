using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class TextResponse
{
    [Key]
    public int ResponseID {get; set;}

    [Required]
    [Column(TypeName = "nvarchar(1000)")]
    public string Content {get; set;} = string.Empty;

    [Required]
    public int QuestionID {get; set;}

    [Required]
    public int HID {get; set;}

    [Required]
    [Column(TypeName = "nvarchar(60)")]
    public string Name {get; set;} = string.Empty;
}