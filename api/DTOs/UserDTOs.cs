using System.ComponentModel.DataAnnotations;

namespace api.DTOs;

public class UserDTOs
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Token { get; set; }
}
