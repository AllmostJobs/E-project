using EProject.Models.UIModels;
using EProject.Services;
using Microsoft.AspNetCore.Mvc;

namespace EProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        private UserService userService;
        private MailService mailService;

        public SignUpController(UserService userService, MailService mailService)
        {
            this.userService = userService;
            this.mailService = mailService;
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
                return Ok("alredy exist");
            }

            userService.AddUser(user);

            UserUI dbUser = userService.GetUser(user.Email, user.Password);

            mailService.AddNewRecord(dbUser.Id);

            var response = new {
                isConfirmed = mailService.CheckIsMailConfirmed(dbUser.Id),
                user = dbUser
            };

            return Ok(response);
        }
    }
}