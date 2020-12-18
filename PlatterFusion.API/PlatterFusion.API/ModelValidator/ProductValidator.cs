using FluentValidation;
using PlatterFusion.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.ModelValidator
{
    public class ProductValidator : AbstractValidator<ProductDto>
    {
        public ProductValidator()
        {
            RuleFor(x => x.Name).NotNull().NotEmpty();
            RuleFor(x => x.Description).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty();
            //RuleFor(x => x.isActive).Must(x => x == false || x == true);
        }
    }
}
