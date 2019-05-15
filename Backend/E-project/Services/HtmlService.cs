using E_project.Models.UIModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_project.Services
{
    public class HtmlService
    {
        public string BuildMailTemplate(UserUI user, string confirmCode, string domain)
        {
            return $"<div style='text-align:center'><h1 style='color:tomato'>E-service<h1/>" +
                $"<h2>Confirm Your Email<h2/>" +
                $"<p style='font-size:1.1rem'>Hello {user.FirstName} {user.LastName}<p/>" +
                $"<p style='font-size:1.1rem'>Please click the following button to confirm that {user.Email} is your email address where you will receive replies to your issuer:<p/>" +
                $"<a style='background-color:orange; padding:10px; text-decoration:none; color:#fff' href='{domain}/confirm/{user.Id}/{confirmCode}'>CONFIRM EMAIL<a/><div/>";
        }
    }
}
