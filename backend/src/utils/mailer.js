import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendEmail(to, link) {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Password Reset",
    html: `
      <p>You requested a password reset.</p>
      <p><a href="${link}">Reset Password</a></p>
      <p>This link expires in 1 hour.</p>
    `,
  });
}
