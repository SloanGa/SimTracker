import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const sendMailResetPasswordProd = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  console.log("API Key:", process.env.SENDGRID_API_KEY);
  const msg = {
    to: "sloangauthier@gmail.com", // Change to your recipient
    from: "sloangauthier@icloud.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
