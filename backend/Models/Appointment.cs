using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Appointment
{
    [Key]
    public int AppointmentID {get; set;}

    [Required]
    public int ReviewID {get; set;}
    
    [Required]
    public DateTime DateAndTime {get; set;}
}