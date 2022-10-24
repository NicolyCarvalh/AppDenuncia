import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import { getFirestore } from "firebase/firestore";

import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId} from '@env'

console.log(apiKey)

const firebaseConfig = {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId};
export const app = firebase.initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
export const db = getFirestore(app);