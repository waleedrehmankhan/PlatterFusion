
using System.ComponentModel.DataAnnotations;

namespace PlatterFusion.API.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public string Image { get; set; }
        [Required]
        public float Price { get; set; }
        public bool isActive { get; set; }
    }
}
