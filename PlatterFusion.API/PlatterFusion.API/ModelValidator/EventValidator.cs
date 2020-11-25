using FluentValidation;
using PlatterFusion.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.ModelValidator
{
    public class EventValidator : AbstractValidator<EventDto>
    {
        public EventValidator()
        {
            RuleFor(x => x.Name).NotNull().NotEmpty().WithMessage("Name Cannot be Empty");
            RuleFor(x => x.Description).NotNull().NotEmpty().WithMessage("Description Cannot be Empty");
            RuleFor(x => x.isActive).Must(x => x == false || x == true);
        }
    }
}
