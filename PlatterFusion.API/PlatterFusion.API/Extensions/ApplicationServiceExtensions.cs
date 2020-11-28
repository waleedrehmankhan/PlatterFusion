using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PlatterFusion.API.Data;
using PlatterFusion.API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(
                   config.GetConnectionString("PlatterFusionDatabase")).UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));

            services.AddScoped<ITokenService, TokenService>();

            return services;

        }
    }
}
