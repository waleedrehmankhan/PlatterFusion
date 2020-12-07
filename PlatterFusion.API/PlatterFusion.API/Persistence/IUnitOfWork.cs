using PlatterFusion.API.Persistence.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Persistence
{
    public interface IUnitOfWork : IDisposable
    {
        IAppUserRepository AppUsers { get; }
        IEventRepository Events { get; }
        IProductRepository Products { get; }
        ICustomerRepository Customers { get; }
        IPaymentRepository Payments { get; }
        IAddressRepository Address { get; }
        IOrderRepository Orders { get; }
        IOrderDetailRepository OrderDetails { get; }
        ISizeRepository Size { get; }
        int Complete();
    }
}
