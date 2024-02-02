// App.js
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { messaging } from './src/firebaseConfig';

const App = () => {
  useEffect(() => {
    // Request permission for iOS
    messaging().requestPermission();

    // Get the FCM token
    messaging().getToken().then((token) => {
      console.log('FCM Token:', token);
    });

    // Handle foreground notifications
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Received foreground notification:', remoteMessage);
      // Handle the notification here
    });

    return () => unsubscribe();
  }, []);

  const scheduleNotification = () => {
    PushNotification.localNotification({
      title: 'My Notification Title',
      message: 'My Notification Message',
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native Firebase Push Notifications</Text>
      <Button title="Schedule Notification" onPress={scheduleNotification} />
    </View>
  );
};

export default App;
