using EProject.Models.UIModels;
using EProject.Services;
using Microsoft.AspNetCore.Mvc;

namespace EProject.Controllers
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
            UserUI dbUser = userService.GetUser(data.Email, data.Password);

            if (data == null || dbUser == null)
            {
                return Ok("error");
            }

            if (dbUser.IsAdmin == true)
            {
                return Ok(new { isConfirmed = true, user = dbUser });
            }
            else
            {
                return Ok(new { isConfirmed = mailService.CheckIsMailConfirmed(dbUser.Id), user = dbUser });
            }
        }
    }
}