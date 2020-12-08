
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Model
{
    public class Order
    {
        public int Id { get; set; }
        public Customer Customer { get; set; }
        public Address OrderAddress { get; set; }
        public Payment Payment { get; set; }
        public string Message { get; set; }
        public string Status { get; set; }
        public DateTime OrderAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        [Display(Name ="Customer")]
        public int CustomerId { get; set; }

        [Display(Name ="Order Address")]
        public int OrderAddressId { get; set; }

        [Display(Name ="Payment")]
        public int PaymentId { get; set; }

    }
}
