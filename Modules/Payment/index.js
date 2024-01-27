const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');

const app = express();
const PORT = process.env.PORT || 3000;

const razorpay = new Razorpay({
  key_id: 'rzp_test_xBKUqKu4w4MU5e',
  key_secret: 'opTJdqGh7YWnB5KodfrMqv6F',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the index.html file when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/create-payment', async (req, res) => {
  const options = {
    amount: 50000, // amount in paise (e.g., 50000 paise = ₹500)
    currency: 'INR',
    receipt: 'order_receipt_123',
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/webhook', (req, res) => {
  const { body } = req;
  const signature = req.get('x-razorpay-signature');

  try {
    const verified = razorpay.webhooks.verify(body, signature);

    if (verified) {
      console.log('Payment successful:', body);
      res.json({ status: 'success' });
    } else {
      console.log('Webhook verification failed');
      res.status(400).json({ status: 'failure' });
    }
  } catch (error) {
    console.error('Error verifying webhook:', error.message);
    res.status(500).json({ status: 'error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
