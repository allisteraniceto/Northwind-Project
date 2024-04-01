using System.Net;
using System.Net.Mail;

public class EmailSender
{
    //create instance of configuration
    private readonly IConfiguration _configuration;

    //receive configuration information so we can use senderEmailAddress and senderPassword
    public EmailSender(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    //method that sends email and takes in the recipient, subject, and body
    public async Task SendEmailAsync(string recipient, string subject, string body)
    {
        //get the senderEmailAddress and senderPassword from the configuration
        string senderEmailAddress = _configuration["email_address"];
        string senderPassword = _configuration["email_password"];

        //create an SMTP client that sends emails via Microsoft Outlook
        var client = new SmtpClient("smtp-mail.outlook.com", 587)
        {
            EnableSsl = true,
            UseDefaultCredentials = false,
            //use the credentials in the configuration
            Credentials = new NetworkCredential(senderEmailAddress, senderPassword)
        };

        //send the email
        await client.SendMailAsync(
            new MailMessage(from: senderEmailAddress,
                            to: recipient,
                            subject,
                            body
                            ));
    }
}