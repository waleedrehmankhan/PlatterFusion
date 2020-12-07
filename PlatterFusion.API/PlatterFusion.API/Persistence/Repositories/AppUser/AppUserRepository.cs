using PlatterFusion.API.Data;
using PlatterFusion.API.Model;
using PlatterFusion.API.Persistence.Interfaces;
using PlatterFusion.API.Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Persistence
{
    public class AppUserRepository : Repository<AppUser>, IAppUserRepository
    {
        public AppUserRepository(DataContext context)
            :base(context)
        {
        }
    }
}
