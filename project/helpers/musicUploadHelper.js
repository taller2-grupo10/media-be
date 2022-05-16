import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const musicUpload = async (musicFile, musicTitle) => {
  // Set the configuration
  // TODO: This config is to test. Replace with app's config object
  const firebaseConfig = {
    apiKey: "AIzaSyDMWhCaChTbBsE8KoOjGPlTRFLRioGsFyU",
    authDomain: "media-upload-29cf6.firebaseapp.com",
    projectId: "media-upload-29cf6",
    storageBucket: "media-upload-29cf6.appspot.com",
    messagingSenderId: "55476725270",
    appId: "1:55476725270:web:568b7f058923d5607e3737",
    measurementId: "G-VDPS24FER3",
  };
  initializeApp(firebaseConfig);
  const storage = getStorage();
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storageRef = ref(storage, musicTitle);

  await uploadBytes(storageRef, musicFile);
  let songUrl = await getDownloadURL(storageRef); // we can also obtain the url later with the storage ref

  return songUrl;
};
