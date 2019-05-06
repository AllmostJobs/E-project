using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_project.Models;
using E_project.Models.UIModels;
using E_project.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        private UserService userService;
        private MailService mailService;
        private E_projectContext db;

        public SignUpController(UserService userService, MailService mailService, E_projectContext db)
        {
            this.userService = userService;
            this.mailService = mailService;
            this.db = db;
        }

        [HttpPost]
        public IActionResult RegistrationData(RegistrationUI user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            if (userService.IsEmailExist(user.Email))
            {
                return BadRequest("User with such email alredy exist!");
            }

            userService.AddUser(user);

            UserUI DbUser = userService.GetUser(user.Email, user.Password);

            mailService.AddNewRecord(DbUser.Id);

            var response = new {
                isConfirmed = mailService.CheckIsMailConfirmed(DbUser.Id),
                user = DbUser
            };

            return Ok(response);
        }
    }
}