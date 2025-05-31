const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Communication = require('../models/Communication');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

router.post('/send', async (req, res) => {
  const { customerId, name, email, message, subject } = req.body;

  if (!email || !message || !subject || !name || !customerId) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields.' });
  }

  const mailOptions = {
    from: `"Shivam Arora" <${process.env.GMAIL_USER}>`,
    to: email,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);

    const communication = new Communication({
      customerId,
      name,
      email,
      message,
      subject,
      status: 'sent'
    });
    await communication.save();

    res.json({ status: 'sent', customerId });
  } catch (error) {
    console.error(`Failed to send email to ${email}`, error);

    const communication = new Communication({
      customerId,
      name,
      email,
      message,
      subject,
      status: 'failed'
    });
    await communication.save();

    res.status(500).json({ status: 'failed', error: error.toString() });
  }
});

module.exports = router;
