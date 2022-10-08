import * as Location from 'expo-location';

export async function findLocation() {
    return await Location.getCurrentPositionAsync({});
}