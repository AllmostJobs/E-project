using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_project.Models
{
    public class E_projectContext : DbContext
    {
        public E_projectContext(DbContextOptions<E_projectContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ConfirmEmail> ConfirmEmail { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasData(
                new User[]
                {
                    new User { Id = Guid.NewGuid().ToString(), FirstName = "Admin", LastName = "Admin", Email = "e.project.rv@gmail.com", Password = "admin", isAdmin = true }
                }
            );
        }
    }
}
