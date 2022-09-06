const nodemailer = require("nodemailer");

module.exports = {
  sendEmail: async (options) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const mailOptions = {
      from: `${options.firstName} ${options.lastName} <${options.email}>`,
      to: ` ${process.env.SENDER_EMAIL}`,
      subject: "ContactEnquiry",
      html: options.message,
    };
    await transporter.sendMail(mailOptions);
  },
};
