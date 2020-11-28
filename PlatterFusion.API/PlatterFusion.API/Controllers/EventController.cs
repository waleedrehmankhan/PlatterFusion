using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PlatterFusion.API.Dtos;
using PlatterFusion.API.Helpers;
using PlatterFusion.API.Model;
using PlatterFusion.API.Persistence;
using PlatterFusion.API.Persistence.Repositories.Event;

namespace PlatterFusion.API.Controllers
{
    public class EventController : BaseApiController
    {

        #region Configuration

        private readonly ILogger<EventController> _logger;
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EventController(ILogger<EventController> logger, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        #endregion

        [HttpPost("all")]
        [Authorize]
        public async Task<ContentResult> GetAll(GetEventInput input)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage(1, "Success");
                var events = await Task.Run(() => _unitOfWork.Events.GetAsync(filter: e => input.Id != 0 ? (e.Id == input.Id) : true));
                var eventsToReturn = _mapper.Map<IEnumerable<EventDto>>(events);

                return this.Content(rm.returnMessage(new PagedResultDto<EventDto>
                    (eventsToReturn.AsQueryable(), input.pagenumber, input.pagesize)),
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
        [ValidateFilter]
        public async Task<ContentResult> CreateOrUpdate(EventDto eventDto)
        {
            ReturnMessage rm = new ReturnMessage(1, "Success");

            try
            {
                var events = await Task.Run(() => _unitOfWork.Events.GetAsync(filter: e => e.Id == eventDto.Id));
                var eventToAdd = _mapper.Map<Event>(eventDto);

                if (events.Count() == 0)
                {
                    eventDto.Id = 0;
                    _unitOfWork.Events.Add(eventToAdd);
                }
                else
                {
                    _unitOfWork.Events.Update(eventToAdd);
                }

                var status = _unitOfWork.Complete();
                _logger.LogInformation("Log:Add Event for ID: {Id}", eventToAdd.Id);
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
        public async Task<ContentResult> Delete(GetEventInput input)
        {
            ReturnMessage rm = new ReturnMessage(1, "Success");

            try
            {
                var events = await Task.Run(() => _unitOfWork.Events.GetAsync(filter: e => e.Id == input.Id));

                if (events.Count() == 0)
                {
                    rm.msgCode = -1;
                    rm.msg = "Not Found";
                }
                else
                {
                    _unitOfWork.Events.Remove(events.First());
                    _unitOfWork.Complete();
                }

                _logger.LogInformation("Log:Delete Event for ID: {Id}", input.Id);
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
