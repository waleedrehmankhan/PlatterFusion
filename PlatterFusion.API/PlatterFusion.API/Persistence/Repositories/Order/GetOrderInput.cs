using PlatterFusion.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Persistence.Repositories.Order
{
    public class GetOrderInput : PagedAndSortedInputDto
    {
        public int Id { get; set; }
    }
}
