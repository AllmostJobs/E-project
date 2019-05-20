using EProject.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EProject.Models
{
    public class EProjectContext : DbContext
    {
        public EProjectContext(DbContextOptions<EProjectContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ConfirmEmail> ConfirmEmails { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasData(
                new User[]
                {
                    new User { Id = Guid.NewGuid().ToString(), FirstName = "Admin", LastName = "Admin", Email = "e.project.rv@gmail.com", Password = "admin", IsAdmin = true }
                }
            );
        }
    }
}
