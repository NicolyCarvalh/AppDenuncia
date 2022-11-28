import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import { getFirestore } from "firebase/firestore";

const apiKey = process.env['apiKey']
const authDomain = process.env['authDomain']
const projectId = process.env['projectId']
const storageBucket = process.env['storageBucket']
const messagingSenderId = process.env['messagingSenderId']
const appId = process.env['appId']
const measurementId = process.env['measurementId']

const firebaseConfig = {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId};
export const app = firebase.initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
export const db = getFirestore(app);