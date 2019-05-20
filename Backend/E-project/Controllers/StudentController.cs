using EProject.Models;
using EProject.Models.UIModels;
using EProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EProject.Controllers
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

        [HttpPost("email/confirm")]
        public IActionResult ConfirmEmail(ConfirmEmailUI obj)
        {
            if(obj.UserId != null || obj.Code != null)
            { 
                ConfirmEmail record = mailService.GetConfirmEmailRecord(obj.UserId);
                if(obj.Code == record.Code)
                {
                    mailService.SetEmailStatus(true, obj.UserId);
                    return Ok(mailService.CheckIsMailConfirmed(obj.UserId));
                }
            }
            return BadRequest();
        }
    }
}