using E_project.Models;
using E_project.Models.UIModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_project.Services
{
    public class SerchService
    {
        E_projectContext db;
        UserService userService;

        public SerchService(E_projectContext db, UserService userService)
        {
            this.db = db;
            this.userService = userService;
        }

        public List<UserUI> SerchUsers(string str)
        {
            if(str == "all")
            {
                return userService.GetUsers();
            }
            List<User> userList = new List<User>();

            userList = db.Users.Where(x => x.FirstName.ToLower().Contains(str) && x.isAdmin == false || x.LastName.ToLower().Contains(str) && x.isAdmin == false).ToList();

            return userService.UserListToUserUIList(userList);
        }
    }
}
