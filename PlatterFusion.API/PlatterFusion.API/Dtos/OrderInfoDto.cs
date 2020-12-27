using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Dtos
{
    public class NewOrderDto
    {
        [Required]
        public List<ProductOrdered> Product { get; set; }
        [Required]
        public CustomerDetails Customer { get; set; }
        [Required]
        public CustomerAddress Address { get; set; }
        [Required]
        public PaymentInfo Payment { get; set; }
        public string Message { get; set; }
        public string Status { get; set; }
        [Required]
        public DateTime OrderTime { get; set; }
    }

    public class CustomerDetails
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string EmailAddress { get; set; }
    }

    public class CustomerAddress
    {
        public int? unit { get; set; }
        public int? apt { get; set; }
        public int? floor { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public string Suburb { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public int PostCode { get; set; }
        [Required]
        public string Country { get; set; }
    }

    public class ProductOrdered 
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int SizeId { get; set; }
        [Required]
        public int Quantity { get; set; }
        public string Message { get; set; }
    }

    public class PaymentInfo
    {
        [Required]
        public string Status { get; set; }
    }

    public class PaymentCreateBindingModel
    {
        public decimal Amount { get; set; }

        private string _email;

        public string Email
        {
            get { return _email; }
            set { _email = value?.ToLower(); }
        }
        public string CardholderName { get; set; }

        public string StripeToken { get; set; }

    }
}
