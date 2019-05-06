using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_project.Models
{
    public class User
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string DateOfBirth { get; set; }
        public string RegistratedDate { get; set; }
        public string StudyDate { get; set; }
        public bool isAdmin { get; set; }
    }
}
