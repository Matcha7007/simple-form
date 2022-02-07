using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User : BaseEntity
    {
        [Required]
        public string UserName { get; set; }
        public byte[] Password { get; set; }
        public byte[] PasswordKey { get; set; }
        public int UserRole { get; set; }
    }
}