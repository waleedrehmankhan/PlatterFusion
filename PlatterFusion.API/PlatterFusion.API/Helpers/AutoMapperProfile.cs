using AutoMapper;
using PlatterFusion.API.Dtos;
using PlatterFusion.API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Domain to Dto
            CreateMap<Event, EventDto>();
            CreateMap<Product, ProductDto>().ForMember(x => x.Picture, scr => scr.MapFrom(x => x.Image)); ;

            CreateMap<Size, SizeDto>();

            // Dto to Domain
            CreateMap<EventDto, Event>();
            CreateMap<ProductDto, Product>();

            CreateMap<CustomerDetails, Customer>();
            CreateMap<CustomerAddress, Address>();
            CreateMap<PaymentInfo, Payment>();

        }
    }
}
