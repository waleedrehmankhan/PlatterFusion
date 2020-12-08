using PlatterFusion.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Persistence.Repositories.OrderAddress
{
    public class GetAddressInput : PagedAndSortedInputDto
    {
        public int Id { get; set; }
    }
}
