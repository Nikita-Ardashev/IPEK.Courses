using IPEK.Courses.Server.Data;
using IPEK.Courses.Server.Domain.Entities;
using IPEK.Courses.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRazorPages();
builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("CoursesContextSQLite")));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDBContext>()
    .AddDefaultTokenProviders();
builder.Services.AddLogging();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddScoped<DBInitializer>();
builder.Services.AddScoped<UserManagerExtended>();

var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

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
    await context.Database.EnsureCreatedAsync();

    var dbInitializer = services.GetRequiredService<DBInitializer>();
    await dbInitializer.InitialCreate();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

await app.RunAsync();