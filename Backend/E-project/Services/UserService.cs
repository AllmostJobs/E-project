using E_project.Models;
using E_project.Models.UIModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_project.Services
{
    public class UserService
    {
        E_projectContext db;
        AuthService authService;

        public UserService(E_projectContext db, AuthService authService)
        {
            this.db = db;
            this.authService = authService;
        }

        public void AddUser(RegistrationUI user)
        {
            db.Users.Add(new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = user.Password,
                RegistratedDate = DateTime.UtcNow.ToString("dd-MM-yyyy"),
                DateOfBirth = user.DateOfBirth,
                isAdmin = false,
            });

            db.SaveChanges();
        }

        public bool IsEmailExist(string email)
        {
            User checkUserEmail = db.Users.FirstOrDefault(x => x.Email == email);

            if(checkUserEmail == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public UserUI UserToUserUI(User user)
        {
            return new UserUI
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                DateOfBirth = user.DateOfBirth,
                RegistratedDate = user.RegistratedDate,
                StudyDate = user.StudyDate,
                isAdmin = user.isAdmin,
                Token = authService.CreateToken(user.Id),
            };
        }

        public List<UserUI> UserListToUserUIList(List<User> users)
        {
            List<UserUI> userUIList = new List<UserUI>();
            int count = 1;

            foreach (var user in users)
            {
                userUIList.Add(new UserUI
                {
                    Id = count++.ToString(),
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    DateOfBirth = user.DateOfBirth,
                    RegistratedDate = user.RegistratedDate,
                    StudyDate = user.StudyDate,
                    isAdmin = user.isAdmin,
                    Token = authService.CreateToken(user.Id),
                });
            }
            return userUIList;
        }

        public UserUI GetUser(string id)
        {
            User user = db.Users.First(x => x.Id == id);

            return UserToUserUI(user);
        }

        public UserUI GetUser(string email, string password)
        {
            User user = db.Users.First(x => x.Email == email && x.Password == password);

            return UserToUserUI(user);
        }

        public List<UserUI> GetUsers() {
            List<User> usersList = db.Users.ToList();
            List<UserUI> usersUIList = new List<UserUI>();
            int count = 1;
            foreach(var user in usersList)
            {
                if (user.isAdmin != true)
                {
                    usersUIList.Add(new UserUI {
                        Id = count++.ToString(),
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        DateOfBirth = user.DateOfBirth,
                        RegistratedDate = user.RegistratedDate,
                        StudyDate = user.StudyDate,
                        Token = authService.CreateToken(user.Id),
                    });
                }
            }

            return usersUIList;
        }

        public UserUI SetDateOfStudy(string id, string date)
        {
            User user = db.Users.SingleOrDefault(x => x.Id == id);
            if (user != null)
            {
                user.StudyDate = date;
                db.Users.Update(user);
                db.SaveChanges();
                return GetUser(id);
            }
            return null;
        }
    }
}
