using PlatterFusion.API.Dtos;
using ServiceBull.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Services.Payments
{
    public interface IStripeService
    {
        Task<(ResponseModel, Stripe.Charge)> ProcessPayment(PaymentCreateBindingModel model);
    }
}
