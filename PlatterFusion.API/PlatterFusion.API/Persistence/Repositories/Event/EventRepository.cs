using PlatterFusion.API.Data;
using PlatterFusion.API.Model;
using PlatterFusion.API.Persistence.Interfaces;
using PlatterFusion.API.Persistence.Repositories;

namespace PlatterFusion.API.Persistence
{
    public class EventRepository : Repository<Event>, IEventRepository
    {
        public EventRepository(DataContext context)
            : base(context)
        {
        }
    }
}
