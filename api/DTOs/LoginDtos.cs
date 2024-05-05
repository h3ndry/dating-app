using System.ComponentModel.DataAnnotations;

namespace api.DTOs;

public class LoginDTos
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }

}
