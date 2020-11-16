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
            Events = new EventRepository(_context);
            Products = new ProductRepository(_context);
        }

        public IEventRepository Events { get; private set; }
        public IProductRepository Products { get; private set; }

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
