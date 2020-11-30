
using System.ComponentModel.DataAnnotations;

namespace PlatterFusion.API.Dtos
{
    public class EventDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public bool isActive { get; set; } = true;
    }
}
