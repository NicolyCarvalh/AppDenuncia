import Toast from 'react-native-toast-message'



export function alertMessage(info = 'info', title, message) {
  console.log(message)
  Toast.show({
    type: info,
    text1: title,
    text2: message
  });
}
