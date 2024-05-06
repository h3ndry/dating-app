using api.Data;
using api.Interfaces;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions;

public static class ApplicationServiceExtension
{

    public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration configuration
            )
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
        });

        services.AddScoped<ITokenService, TokenServices>();
        return services;
    }
}

