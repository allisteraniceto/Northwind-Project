using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Review
{
    [Key]
    public int ReviewID {get; set;}

    [Required]
    [Column(TypeName = "nvarchar(60)")]
    public string ManagerName {get; set;}

    [Required]
    [Column(TypeName = "nvarchar(60)")]
    public string EmployeeName {get; set;}


    public int EmployeeSignature {get; set;}

    public int ManagerSignature {get; set;}

    [Required]
    public int EmployeeHID {get; set;}

    [Required]
    public int ManagerHID {get; set;}

    [Required]
    [Column(TypeName = "nvarchar(40)")]
    public string Status {get; set;} = "Initiated";
}