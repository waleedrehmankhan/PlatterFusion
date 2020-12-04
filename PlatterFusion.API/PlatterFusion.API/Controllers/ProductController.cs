using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PlatterFusion.API.Dtos;
using PlatterFusion.API.Helpers;
using PlatterFusion.API.Model;
using PlatterFusion.API.Persistence;
using PlatterFusion.API.Persistence.Repositories.Product;

namespace PlatterFusion.API.Controllers
{
    public class ProductController : BaseApiController
    {
        #region Configuration

        private readonly ILogger<ProductController> _logger;
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductController(ILogger<ProductController> logger, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        #endregion

        [HttpPost("all")]
        public async Task<ContentResult> GetAll(GetProductInput input)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage(1, "Success");
                var products = await Task.Run(() => _unitOfWork.Products.GetAsync(filter: e => input.Id != 0 ? (e.Id == input.Id) : true));
                var productsToReturn = _mapper.Map<IEnumerable<ProductDto>>(products);

                return this.Content(rm.returnMessage(new PagedResultDto<ProductDto>
                    (productsToReturn.AsQueryable(), input.pagenumber, input.pagesize)),
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

        [HttpPost("save")]
        public async Task<ContentResult> CreateOrUpdate(ProductDto productDto)
        {
            ReturnMessage rm = new ReturnMessage(1, "Success");

            try
            {
                var products = await Task.Run(() => _unitOfWork.Products.GetAsync(filter: e => e.Id == productDto.Id));
                var productToAdd = _mapper.Map<Product>(productDto);

                if (products.Count() == 0)
                {
                    productDto.Id = 0;
                    _unitOfWork.Products.Add(productToAdd);
                }
                else
                {
                    _unitOfWork.Products.Update(productToAdd);
                }

                var status = _unitOfWork.Complete();
                _logger.LogInformation("Log:Add Product for ID: {Id}", productToAdd.Id);
                return this.Content(rm.returnMessage(null),
                         "application/json");
            }
            catch (Exception ex)
            {
                rm.msg = ex.Message.ToString();
                rm.msgCode = 0;
                return this.Content(rm.returnMessage(null));
            }
        }

        [HttpPost("delete")]
        public async Task<ContentResult> Delete(GetProductInput input)
        {
            ReturnMessage rm = new ReturnMessage(1, "Success");

            try
            {
                var products = await Task.Run(() => _unitOfWork.Products.GetAsync(filter: e => e.Id == input.Id));

                if (products.Count() == 0)
                {
                    rm.msgCode = -1;
                    rm.msg = "Not Found";
                }
                else
                {
                    _unitOfWork.Products.Remove(products.First());
                    _unitOfWork.Complete();
                }

                _logger.LogInformation("Log:Delete Product for ID: {Id}", input.Id);
                return this.Content(rm.returnMessage(null),
                            "application/json");
            }
            catch (Exception ex)
            {
                rm.msg = ex.Message.ToString();
                rm.msgCode = 0;
                return this.Content(rm.returnMessage(null));
            }
        }
    }
}
