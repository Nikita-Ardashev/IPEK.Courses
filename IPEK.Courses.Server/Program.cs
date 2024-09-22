using IPEK.Courses.Server.Data;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Interfaces;
using IPEK.Courses.Server.Services;
using IPEK.Courses.Server.Services.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRazorPages();
builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options
        .UseLazyLoadingProxies()
        .UseSqlite(builder.Configuration.GetConnectionString("CoursesContextSQLite"));
});
builder
    .Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<ApplicationDBContext>()
    .AddDefaultTokenProviders();
builder.Services.AddLogging();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddScoped<DBInitializer>();
builder.Services.AddScoped<UserManagerExtended>();
builder.Services.AddScoped<GroupManager>();
builder.Services.AddScoped<ITaskWithUserContextProvider, TaskWithUserContextProvider>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowReactApp",
        policy =>
        {
            policy
                .WithOrigins("https://localhost:5173", "http://localhost:5035")
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    );
});

var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowReactApp");
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}

app.UseSwagger();
app.UseSwaggerUI();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<ApplicationDBContext>();
    //await context.Database.EnsureCreatedAsync();
    await context.Database.MigrateAsync();

    var dbInitializer = services.GetRequiredService<DBInitializer>();
    await dbInitializer.InitialCreate();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

await app.RunAsync();
