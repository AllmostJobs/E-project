using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EProject.Models.UIModels
{
    public class MailUI
    {
        public string FromUser { get; set; }
        public string ToUser { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
