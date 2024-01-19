using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Rating
{
    [Key]
    public int RatingID {get; set;}

    [Required]
    public int Value {get; set;}
    
    [Required]
    public int ReviewID {get; set;}

    [Required]
    public int QuestionID {get; set;}
}