using PlatterFusion.API.Data;
using PlatterFusion.API.Persistence.Interfaces;

namespace PlatterFusion.API.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;

        public UnitOfWork(DataContext context)
        {
            _context = context;
            AppUsers = new AppUserRepository(_context);
            Events = new EventRepository(_context);
            Products = new ProductRepository(_context);
            Customers = new CustomerRepository(_context);
            Payments = new PaymentRepository(_context);
            Address = new AddressRepository(_context);
            Orders = new OrderRepository(_context);
            OrderDetails = new OrderDetailRepository(_context);
            Size = new SizeRepository(_context);
        }

        public IAppUserRepository AppUsers { get; private set; }
        public IEventRepository Events { get; private set; }
        public IProductRepository Products { get; private set; }
        public ICustomerRepository Customers { get; private set; }
        public IPaymentRepository Payments { get; private set; }
        public IAddressRepository Address { get; private set; }
        public IOrderRepository Orders { get; private set; }
        public IOrderDetailRepository OrderDetails { get; private set; }
        public ISizeRepository Size { get; private set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
