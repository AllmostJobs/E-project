using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_project.Models.UIModels;
using E_project.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignInController : ControllerBase
    {
        private UserService userService;
        private MailService mailService;

        public SignInController(UserService userService, MailService mailService)
        {
            this.userService = userService;
            this.mailService = mailService;
        }

        [HttpPost]
        public IActionResult LoginData(LoginUI data)
        {
            if(data == null)
            {
                return BadRequest();
            }

            UserUI DbUser = userService.GetUser(data.Email, data.Password);

            var response = new
            {
                isConfirmed = mailService.CheckIsMailConfirmed(DbUser.Id),
                user = DbUser
            };

            return Ok(response);
        }
    }
}