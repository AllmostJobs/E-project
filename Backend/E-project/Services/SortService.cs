using E_project.Models;
using E_project.Models.UIModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_project.Services
{
    public class SortService
    {
        E_projectContext db;
        UserService userService;

        public SortService(E_projectContext db, UserService userService)
        {
            this.db = db;
            this.userService = userService;
        }

        public List<UserUI> GetSortedUsers(string filter)
        {
            List<UserUI> userUIList = userService.GetUsers();

            switch (filter)
            {
                case "all":
                    return userUIList;
                case "byName":
                    return userUIList.OrderBy(x => x.FirstName).ToList();
                case "byAge":
                    return userUIList.OrderBy(x => x.DateOfBirth).ToList();
                case "byDate":
                    return userUIList.Where(x => x.StudyDate != null).ToList();
                case "byDateEmpty":
                    return userUIList.Where(x => x.StudyDate == null).ToList();
                default:
                    return userUIList;
            }
        } 
    }
}
