const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;


const accountSid = 'ACfeaf8485868d05fb2257f745c4b4c13f'; //YOUR_TWILIO_ACCOUNT_SID
const authToken = 'YOUR_TWILIO_AUTH_TOKEN'; //YOUR_TWILIO_AUTH_TOKEN
const twilioClient = twilio(accountSid, authToken);

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// In-memory storage for OTPs (you should use a database in a real-world scenario)
const otpStorage = {};

app.use(bodyParser.urlencoded({ extended: false }));

// Endpoint to initiate OTP sending
app.post('/send-otp', (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  // Generate OTP
  const otp = generateOTP();

  // Save OTP in storage
  otpStorage[phoneNumber] = otp;

  // Send OTP via Twilio
  twilioClient.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: '9952943340',
      to: phoneNumber,
    })
    .then(() => {
      res.send('OTP sent successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Failed to send OTP');
    });
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const userEnteredOTP = req.body.otp;

  // Retrieve saved OTP from storage
  const storedOTP = otpStorage[phoneNumber];

  if (userEnteredOTP === storedOTP) {
    res.send('OTP verification successful');
  } else {
    res.status(400).send('OTP verification failed');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
