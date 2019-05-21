using EProject.Models;
using EProject.Models.UIModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace EProject.Services
{
    public class MailService
    {
        private EProjectContext database;
        private UserService userService;
        private HtmlService htmlService;
        private SmtpClient smtpClient;

        private readonly string credentialEmail = "e.project.rv@gmail.com";
        private readonly string credentialPass = "vrfvwzemrducyhiq";

        public MailService(EProjectContext database, UserService userService, HtmlService htmlService, SmtpClient smtpClient)
        {
            this.database = database;
            this.userService = userService;
            this.htmlService = htmlService;
            this.smtpClient = smtpClient;
        
            this.smtpClient.Host = "smtp.gmail.com";
            this.smtpClient.Port = 587;
            this.smtpClient.EnableSsl = true;
            this.smtpClient.Credentials = new NetworkCredential(credentialEmail, credentialPass);
        }

        public bool CheckIsMailConfirmed(string userId)
        {
            ConfirmEmail email = database.ConfirmEmails.FirstOrDefault(x => x.UserId == userId);

            if (email != null)
            {
                return email.IsConfirmed;
            }
            return false;
        }

        public void SetEmailStatus(bool isConfirmed, string userId)
        {
            ConfirmEmail email = database.ConfirmEmails.FirstOrDefault(x => x.UserId == userId);

            if(email != null)
            {
                email.IsConfirmed = isConfirmed;
                database.ConfirmEmails.Update(email);
                database.SaveChanges();
            }
        }

        public void AddNewRecord(string userId)
        {
            ConfirmEmail record = new ConfirmEmail() {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                IsConfirmed = false
            };

            database.ConfirmEmails.Add(record);
            database.SaveChanges();
        }

        public void SendConfirmMail(string userId, string domain)
        {
            ConfirmEmail record = database.ConfirmEmails.FirstOrDefault(x => x.UserId == userId);
            UserUI user = userService.GetUser(userId);

            if (record.Code == null)
            {
                string confirmCode = Guid.NewGuid().ToString();

                record.Code = confirmCode;
                database.ConfirmEmails.Update(record);
                database.SaveChanges();

                MailMessage mailMessage = new MailMessage(credentialEmail, user.Email)
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
            return database.ConfirmEmails.SingleOrDefault(x => x.UserId == userId);
        }

        public void SendMail(MailUI mail)
        {
            MailMessage mailMessage = new MailMessage(credentialEmail, mail.ToUser)
            {
                Subject = mail.Subject,
                Body = mail.Message
            };

            smtpClient.Send(mailMessage);
        }

        public void SendStudyMail(string toUser, string date)
        {
            MailMessage mailMessage = new MailMessage(credentialEmail, toUser)
            {
                Subject = "E-project",
                Body = "We are writing to inform you that your training will start in " + date
            };

            smtpClient.Send(mailMessage);
        }
    }
}
