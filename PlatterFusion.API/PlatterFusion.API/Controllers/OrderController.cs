using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PlatterFusion.API.Dtos;
using PlatterFusion.API.Helpers;
using PlatterFusion.API.Model;
using PlatterFusion.API.Persistence;
using PlatterFusion.API.Persistence.Repositories.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Controllers
{
    public class OrderController : BaseApiController
    {
        #region Configuration

        private readonly ILogger<OrderController> _logger;
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrderController(ILogger<OrderController> logger, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _logger = logger;
        }

        #endregion


        [HttpPost("all")]
        public async Task<JsonResult> GetOrder(GetOrderInput input)
        {
            throw new NotImplementedException();
        }

        [HttpPost("save")]
        public async Task<ContentResult> CreateOrder(NewOrderDto order)
        {
            ReturnMessage rm = new ReturnMessage(1, "Success");

            try
            {
                var customer = _mapper.Map<Customer>(order.Customer);
                var address = _mapper.Map<Address>(order.Address);
                var payment = _mapper.Map<Payment>(order.Payment);


                var customerAdded = _unitOfWork.Customers._Add(customer);
                var addressAdded = _unitOfWork.Address._Add(address);
                var paymentAdded = _unitOfWork.Payments._Add(payment);

                var orderAdded = _unitOfWork.Orders._Add(new Order()
                {
                    Message = order.Message,
                    Status = "Pending",
                    Customer = customerAdded,
                    OrderAddress = addressAdded,
                    Payment = paymentAdded,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    OrderAt = order.OrderTime
                });

                foreach (var item in order.Product)
                {
                    _unitOfWork.OrderDetails.Add(new OrderDetail()
                    {
                        Quantity = item.Quantity,
                        Message = item.Message,
                        Order = orderAdded,
                        ProductId = item.ProductId,
                        SizeId = item.SizeId
                    });
                }

                _unitOfWork.Complete();

                return this.Content(rm.returnMessage(null),
                         "application/json");
            }
            catch (Exception ex)
            {
                return this.Content(JsonConvert.SerializeObject(new
                {
                    // 0 is Exception
                    msgCode = 0,
                    msg = ex.Message
                }), "application/json");
            }

        }

    }
}
