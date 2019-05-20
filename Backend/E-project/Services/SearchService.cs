using EProject.Models;
using EProject.Models.UIModels;
using System.Collections.Generic;
using System.Linq;

namespace EProject.Services
{
    public class SearchService
    {
        EProjectContext database;
        UserService userService;

        public SearchService(EProjectContext database, UserService userService)
        {
            this.database = database;
            this.userService = userService;
        }

        public List<UserUI> SearchUsers(string str)
        {
            if(str == "all")
            {
                return userService.GetUsers();
            }
            List<User> userList = new List<User>();

            userList = database.Users.Where(x => x.FirstName.ToLower().Contains(str) && x.IsAdmin == false || x.LastName.ToLower().Contains(str) && x.IsAdmin == false).ToList();

            return userService.UserListToUserUIList(userList);
        }
    }
}
