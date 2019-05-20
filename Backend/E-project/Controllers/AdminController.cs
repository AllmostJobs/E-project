using EProject.Models.UIModels;
using EProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EProject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private UserService userService;
        private SortService sortService;
        private SearchService searchService;
        private MailService mailService;

        public AdminController(UserService userService, SortService sortService, SearchService serchService, MailService mailService)
        {
            this.userService = userService;
            this.sortService = sortService;
            this.searchService = serchService;
            this.mailService = mailService;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(userService.GetUsers());
        }

        [HttpGet("search/{value}")]
        public IActionResult UserSearch(string value)
        {
            return Ok(searchService.SearchUsers(value));
        }

        [HttpGet("sort/{value}")]
        public IActionResult UserSort(string value)
        {
            return Ok(sortService.GetSortedUsers(value));
        }

        [HttpPost("send-mail")]
        public IActionResult SendMail(MailUI mail)
        {
            mailService.SendMail(mail);
            return Ok();
        }
    }
}