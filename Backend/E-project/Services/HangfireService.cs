using Hangfire;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace E_project.Services
{
    public class HangfireService
    {
        private MailService mailService;

        public HangfireService(MailService mailService)
        {
            this.mailService = mailService;
        }

        public void SetDateOfMessage(string date, string mail)
        {
            DateTime dateParsed = DateTime.Parse(date);
            mailService.SendStudyMail(mail, date);

            if (dateParsed > DateTime.Now.AddDays(7))
            {
                BackgroundJob.Schedule(() => mailService.SendStudyMail(mail, date),
                    DateTime.Now.AddDays(7));
            }
            if (dateParsed > DateTime.Now.AddMonths(1))
            {
                BackgroundJob.Schedule(() => mailService.SendStudyMail(mail, date),
                    DateTime.Now.AddMonths(1));
            }

            BackgroundJob.Schedule(() => mailService.SendStudyMail(mail, date),
               dateParsed.AddDays(-1));
        }
    }
}
