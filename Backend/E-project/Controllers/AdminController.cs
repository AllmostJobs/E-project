using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class AdminController : ControllerBase
    {
        UserService userService;
        SortService sortService;
        SerchService serchService;
        MailService mailService;

        public AdminController(UserService userService, SortService sortService, SerchService serchService, MailService mailService)
        {
            this.userService = userService;
            this.sortService = sortService;
            this.serchService = serchService;
            this.mailService = mailService;
        }

        [HttpGet]
        public IActionResult SendUsers()
        {
            return Ok(userService.GetUsers());
        }

        [HttpGet("serch/{value}")]
        public IActionResult UserSerch(string value)
        {
            return Ok(serchService.SerchUsers(value));
        }

        [HttpGet("sort/{value}")]
        public IActionResult UserSort(string value)
        {
            return Ok(sortService.GetSortedUsers(value));
        }

        [HttpPost("mail")]
        public IActionResult SendMail(MailUI mail)
        {
            mailService.SendMail(mail);
            return Ok();
        }
    }
}