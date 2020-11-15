using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Persistence
{
    public interface IUnitOfWork : IDisposable
    {
        int Complete();
    }
}
