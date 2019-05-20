using EProject.Models.UIModels;
using System.Collections.Generic;
using System.Linq;

namespace EProject.Services
{
    public class SortService
    {
        UserService userService;

        public SortService(UserService userService)
        {
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
