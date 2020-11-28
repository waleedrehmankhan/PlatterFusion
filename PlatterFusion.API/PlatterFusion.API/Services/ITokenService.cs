using PlatterFusion.API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Services
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
