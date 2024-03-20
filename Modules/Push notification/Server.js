// Import Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Path to your service account key JSON file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Function to send a push notification
async function sendPushNotification(token, title, body) {
  try {
    const message = {
      notification: {
        title: title,
        body: body
      },
      token: token
    };

    // Send the message
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Example usage
const token = 'device_token_here'; // Device token of the recipient
const title = 'Hello';
const body = 'This is a push notification from Firebase!';

sendPushNotification(token, title, body);
