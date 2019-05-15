using E_project.Models;
using E_project.Models.UIModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace E_project.Services
{
    public class MailService
    {
        private E_projectContext db;
        private UserService userService;
        private HtmlService htmlService;
        private string domain;

        public MailService(E_projectContext db, UserService userService, HtmlService htmlService)
        {
            this.db = db;
            this.userService = userService;
            this.htmlService = htmlService;
            this.domain = "http://localhost:8080";
        }

        public bool CheckIsMailConfirmed(string userId)
        {
            ConfirmEmail email = db.ConfirmEmail.SingleOrDefault(x => x.UserId == userId);

            if (email != null)
            {
                return email.isConfirmed;
            }
            return false;
        }

        public void SetEmailStatus(bool isConfirmed, string userId)
        {
            ConfirmEmail email = db.ConfirmEmail.Single(x => x.UserId == userId);

            if(email != null)
            {
                email.isConfirmed = isConfirmed;
                db.ConfirmEmail.Update(email);
                db.SaveChanges();
            }
        }

        public void AddNewRecord(string userId)
        {
            ConfirmEmail record = new ConfirmEmail() {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                isConfirmed = false
            };

            db.ConfirmEmail.Add(record);
            db.SaveChanges();
        }

        public void SendConfirmMail(string userId)
        {
            ConfirmEmail record = db.ConfirmEmail.Single(x => x.UserId == userId);
            UserUI user = userService.GetUser(userId);

            if (record.Code == null)
            {
                string confirmCode = Guid.NewGuid().ToString();

                record.Code = confirmCode;
                db.ConfirmEmail.Update(record);
                db.SaveChanges();

                var smtpClient = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    Credentials = new NetworkCredential("e.project.rv@gmail.com", "vrfvwzemrducyhiq")
                };

                MailMessage mailMessage = new MailMessage("e.project.rv@gmail.com", user.Email)
                {
                    Subject = "Confirm email",
                    Body = htmlService.BuildMailTemplate(user, confirmCode, domain)
                };

                mailMessage.IsBodyHtml = true;

                smtpClient.Send(mailMessage);
            }
        }

        public ConfirmEmail GetConfirmEmailRecord(string userId)
        {
            return db.ConfirmEmail.Single(x => x.UserId == userId);
        }

        public void SendMail(MailUI mail)
        {
            var smtpClient = new SmtpClient
            {
                Host = "smtp.gmail.com", 
                Port = 587,
                EnableSsl = true,
                Credentials = new NetworkCredential("e.project.rv@gmail.com", "vrfvwzemrducyhiq")
            };

            MailMessage mailMessage = new MailMessage("e.project.rv@gmail.com", mail.ToUser)
            {
                Subject = mail.Subject,
                Body = mail.Message
            };

            smtpClient.Send(mailMessage);
        }

        public void SendStudyMail(string toUser, string date)
        {
            var smtpClient = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                Credentials = new NetworkCredential("e.project.rv@gmail.com", "vrfvwzemrducyhiq")
            };

            MailMessage mailMessage = new MailMessage("e.project.rv@gmail.com", toUser)
            {
                Subject = "E-project",
                Body = "We are writing to inform you that your training will start in " + date
            };

            smtpClient.Send(mailMessage);
        }
    }
}
