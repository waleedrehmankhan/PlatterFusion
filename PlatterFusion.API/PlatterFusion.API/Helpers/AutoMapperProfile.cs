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

            // Dto to Domain
            CreateMap<EventDto, Event>();
        }
    }
}
