using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_project.Models;
using E_project.Models.UIModels;
using E_project.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_project.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private UserService userService;
        private HangfireService hangfireService;
        private MailService mailService;

        public StudentController(UserService userService, HangfireService hangfireService, MailService mailService)
        {
            this.userService = userService;
            this.hangfireService = hangfireService;
            this.mailService = mailService;
        }

        [HttpGet("x")]
        public IActionResult get()
        {
            return Ok("Ok");
        }

        [HttpGet("{id}/{date}")]
        public IActionResult SetDateOfStudy(string id, string date)
        {
            UserUI user = userService.SetDateOfStudy(id, date);

            if (user != null)
            {
                hangfireService.SetDateOfMessage(date, user.Email);
                return Ok(user);
            }
            return BadRequest();
        }

        [HttpGet("email/confirm/{id}")]
        public IActionResult SendConfirmMessage(string id)
        {
            if (mailService.CheckIsMailConfirmed(id) == false)
            {
                mailService.SendConfirmMail(id);
            }
            return Ok(mailService.CheckIsMailConfirmed(id));
        }

        [HttpGet("confirm/{id}/{code}")]
        public IActionResult ConfirmEmail(string id, string code)
        {
            ConfirmEmail record = mailService.GetConfirmEmailRecord(id);
            if(code == record.Code)
            {
                mailService.SetEmailStatus(true, id);
                return Ok("Email is confirmed");
            }
            return BadRequest();
        }
    }
}