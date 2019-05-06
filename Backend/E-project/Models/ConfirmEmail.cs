using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_project.Models
{
    public class ConfirmEmail
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Code { get; set; }
        public bool isConfirmed { get; set; }
    }
}
