using System;
using System.Collections.Generic;
using System.Text;
using static PlatterFusion.API.Services.media.Enums;

namespace ServiceBull.Core.Helpers
{
    public class ResponseModel
    {
        public ServiceStatus ServiceStatus { get; set; }
        public List<(string, string)> Errors { get; set; }

        public ResponseModel()
        {
            Errors = new List<(string, string)>();
        }
    }
}