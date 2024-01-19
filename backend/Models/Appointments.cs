using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Appointment
{
    [Key]
    public int AppointmentID {get; set;}

    [Required]
    public int ReviewID {get; set;}

    [Required]
    [Column(TypeName = "nvarchar(200)")]
    public string Event {get; set;}
    
    [Required]
    public DateTime DateAndTime {get; set;}
}