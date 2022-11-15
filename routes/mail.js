const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
require("dotenv").config();

router.post("/generateotp", (req, res) => {
  try {
    const { email } = req.body;

    const generatedOtp = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASSWORD}`,
      },
    });

    const mailOptions = {
      from: `${process.env.EMAIL}`,
      to: email,
      subject: "Verification Mail",
      html: `<p>Your OTP(One Time Password) for registration with the Coding Junction app is: ${generatedOtp}. Please do not share it with anyone.</p><br/><p>Regards,</p><p>The Coding Junction.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: "otp_failed" });
      } else {
        console.log(info);
        return res.status(200).json({ message: "otp_sent", otp: generatedOtp });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "otp_failed" });
  }
});

module.exports = router;
