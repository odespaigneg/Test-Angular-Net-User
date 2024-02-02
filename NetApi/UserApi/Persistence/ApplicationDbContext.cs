using Microsoft.EntityFrameworkCore;
using UserApi.Domain;

namespace UserApi.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions)
            : base(dbContextOptions)
        {
        
        }

        public DbSet<User> Users { get; set; }
    }
}
