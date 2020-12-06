using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Model
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; }
        public Size Size { get; set; }
        public int Quantity { get; set; }
        public string Message { get; set; }

        [Display(Name = "Order")]
        public int OrderId { get; set; }
        [Display(Name ="Product")]
        public int ProductId { get; set; }
        [Display(Name ="Size")]
        public int SizeId { get; set; }
        
    }
}
