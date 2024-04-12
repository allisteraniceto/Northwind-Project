using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Attachment
{
    [Key]
    public int FileID {get; set;}

    [Required]
    public int ReviewID {get; set;}


    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string AttachmentName {get; set;}

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string Caption {get; set;}
}