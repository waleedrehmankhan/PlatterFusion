﻿using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PlatterFusion.API.Data;
using PlatterFusion.API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlatterFusion.API.Helpers;

namespace PlatterFusion.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(
                   config.GetConnectionString("PlatterFusionDatabase")).UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            return services;

        }
    }
}
