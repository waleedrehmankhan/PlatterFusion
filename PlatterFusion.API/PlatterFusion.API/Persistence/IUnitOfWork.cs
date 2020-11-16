using PlatterFusion.API.Persistence.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Persistence
{
    public interface IUnitOfWork : IDisposable
    {
        IEventRepository Events { get; }
        IProductRepository Products { get; }
        int Complete();
    }
}
