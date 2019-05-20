using EProject.Models;
using EProject.Models.UIModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EProject.Services
{
    public class UserService
    {
        private EProjectContext database;
        private AuthService authService;

        public UserService(EProjectContext database, AuthService authService)
        {
            this.database = database;
            this.authService = authService;
        }

        public void AddUser(RegistrationUI user)
        {
            database.Users.Add(new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = user.Password,
                RegistratedDate = DateTime.UtcNow.ToString("dd-MM-yyyy"),
                DateOfBirth = user.DateOfBirth,
                IsAdmin = false,
            });

            database.SaveChanges();
        }

        public bool IsEmailExist(string email)
        {
            return database.Users.Any(x => x.Email == email);
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
                IsAdmin = user.IsAdmin,
                Token = authService.BuildToken(user),
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
                    IsAdmin = user.IsAdmin,
                    Token = authService.BuildToken(user),
                });
            }
            return userUIList;
        }

        public UserUI GetUser(string id)
        {
            User user = database.Users.FirstOrDefault(x => x.Id == id);

            return user == null ? null :  UserToUserUI(user);
        }

        public UserUI GetUser(string email, string password)
        {
            User user = database.Users.FirstOrDefault(x => x.Email == email && x.Password == password);

            return user == null ? null : UserToUserUI(user);
        }

        public List<UserUI> GetUsers() {
            List<User> usersList = database.Users.ToList();
            List<UserUI> usersUIList = new List<UserUI>();
            int count = 1;
            foreach(var user in usersList)
            {
                if (user.IsAdmin != true)
                {
                    usersUIList.Add(new UserUI {
                        Id = count++.ToString(),
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        DateOfBirth = user.DateOfBirth,
                        RegistratedDate = user.RegistratedDate,
                        StudyDate = user.StudyDate,
                        Token = null,
                    });
                }
            }

            return usersUIList;
        }

        public UserUI SetDateOfStudy(string id, string date)
        {
            User user = database.Users.FirstOrDefault(x => x.Id == id);
            if (user != null)
            {
                user.StudyDate = date;
                database.Users.Update(user);
                database.SaveChanges();
                return GetUser(id);
            }
            return null;
        }
    }
}
