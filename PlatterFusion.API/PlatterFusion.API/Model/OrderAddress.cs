using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Model
{
    public class OrderAddress
    {
        public int Id { get; set; }
        public int? unit { get; set; }
        public int? apt { get; set; }
        public int? floor { get; set; }
        public string Street { get; set; }
        public string Suburb { get; set; }
        public string State { get; set; }
        public int PostCode { get; set; }
        public string Country { get; set; }

    }
}
