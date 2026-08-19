import { initializeApp } from "firebase/app";
import { getMessaging, getToken, deleteToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDLp52E7-yzXST6OHAYT5dWF1Gjfl2ZP1M",
  authDomain: "test-49b2e.firebaseapp.com",
  projectId: "test-49b2e",
  storageBucket: "test-49b2e.firebasestorage.app",
  messagingSenderId: "707645520656",
  appId: "1:707645520656:web:bbc9cb8813c9d768d58395",
  measurementId: "G-6236M2K7SL",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        //  vapidKey: "YOUR_VAPID_PUBLIC_KEY",
        vapidKey:
          "BKZ9jFv-1KFZVtHwTH-SGi9bRarlxUCpWwcT4q_KbGsL2T96FUNBl6HvJs-dSGJ7Pjtc_y1ZL5s0Hx7vCFlcfvc",
      });
      console.log("Token:", token);
      return token;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getFcmTokenAsString = () => {
  return requestPermission()
    .then((fcm_token) => {
      // The resolved value (string or null) is passed here
      return fcm_token || "";
    })
    .catch((error) => {
      // In case of an error, we return an empty string
      console.error("Error getting FCM token:", error);
      return "";
    });
};

export const removeFcmToken = async () => {
  try {
    // محاولة حذف التوكن من فايربيس في هذا المتصفح
    const deleted = await deleteToken(messaging);
    if (deleted) {
      console.log("تم حذف الـ FCM Token بنجاح.");
    } else {
      console.log("لم يتم حذف التوكن، قد لا يكون هناك توكن مسجل.");
    }
    return deleted;
  } catch (error) {
    console.error("حدث خطأ أثناء حذف الـ FCM Token:", error);
    return false;
  }
};
