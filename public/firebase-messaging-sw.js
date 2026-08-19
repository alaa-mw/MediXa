importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
 apiKey: "AIzaSyDLp52E7-yzXST6OHAYT5dWF1Gjfl2ZP1M",
  authDomain: "test-49b2e.firebaseapp.com",
  projectId: "test-49b2e",
  storageBucket: "test-49b2e.firebasestorage.app",
  messagingSenderId: "707645520656",
  appId: "1:707645520656:web:bbc9cb8813c9d768d58395",
  measurementId: "G-6236M2K7SL"
});

const messaging = firebase.messaging();

// التعامل مع الإشعارات في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});