import { initializeApp } from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const firebaseConfig = {
  // Your Firebase config here
};

initializeApp(firebaseConfig);

export { messaging };