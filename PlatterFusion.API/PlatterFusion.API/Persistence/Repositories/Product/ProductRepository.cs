using PlatterFusion.API.Persistence.Interfaces;
using PlatterFusion.API.Model;
using PlatterFusion.API.Data;
using PlatterFusion.API.Persistence.Repositories;

namespace PlatterFusion.API.Persistence
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(DataContext context)
            : base(context)
        {
        }
    }
}
