import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const getFileUrl = async (fileTitle) => {
  // Set the configuration
  const firebaseConfig = {
    apiKey: process.env.STORAGE_API_KEY,
    authDomain: process.env.STORAGE_AUTH_DOMAIN,
    projectId: process.env.STORAGE_PROJECT_ID,
    storageBucket: process.env.STORAGE_STORAGE_BUCKET,
    messagingSenderId: process.env.STORAGE_MESSAGING_SENDER_ID,
    appId: process.env.STORAGE_APP_ID,
    measurementId: process.env.STORAGE_MEASUREMENT_ID,
  };
  initializeApp(firebaseConfig);
  const storage = getStorage();
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storageRef = ref(storage, fileTitle);

  let fileUrl = await getDownloadURL(storageRef); // we can also obtain the url later with the storage ref

  return fileUrl;
};
