using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class File
{
    [Key]
    public int FileID {get; set;}

    [Required]
    public int ReviewID {get; set;}


    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string FileName {get; set;}

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string Caption {get; set;}
}