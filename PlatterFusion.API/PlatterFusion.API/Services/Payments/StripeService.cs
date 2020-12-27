using PlatterFusion.API.Dtos;
using PlatterFusion.API.Services.media;
using ServiceBull.Core.Helpers;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Services.Payments
{
    public class StripeService: IStripeService
    {
        private readonly Stripe.ChargeService _stripeChargeService;
        public StripeService() { 
            _stripeChargeService = new Stripe.ChargeService();
        }
        public async Task<(ResponseModel, Stripe.Charge)> ProcessPayment(PaymentCreateBindingModel model)
        {
            var responseModel = new ResponseModel() { ServiceStatus = Enums.ServiceStatus.Error };
            try
            {
                StripeConfiguration.ApiKey = "sk_test_kRWpvCZmKMlhNd5BOMK10CfV";
                var metaData = new Dictionary<string, string>
                {
                    {nameof(model.CardholderName), model.CardholderName }
                };
                var myCharge = new Stripe.ChargeCreateOptions
                {
                    Amount = (int)(model.Amount * 100),
                    Currency = "AUD",
                    Metadata = metaData,
                    Source = model.StripeToken,
                    Description = $"$ {model.Amount} paid for customer"
                };

                var stripeCharge = await _stripeChargeService.CreateAsync(myCharge);

                responseModel.ServiceStatus = Enums.ServiceStatus.Success;
                return (responseModel, stripeCharge);
            }
            catch (Stripe.StripeException e)
            {
                responseModel.Errors.Add((e.HttpStatusCode.ToString(), e.Message));
                return (responseModel, null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
