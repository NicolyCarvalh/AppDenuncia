let isOnline = true;
import Firebase from 'firebase'
import { alertMessage } from 'helpers/alertMessage';

var firebaseRef = new Firebase('http://INSTANCE.firebaseio.com');
firebaseRef.child('.info/connected').on('value', function(connectedSnap) {
  isOnline = connectedSnap.value();
  if (connectedSnap.val() === true) {
    alertMessage('success', "Conexão", "Você está online!")
  } else {
    alertMessage('info', "Conexão", "Você está offline!")
  }
});

export default isOnline;