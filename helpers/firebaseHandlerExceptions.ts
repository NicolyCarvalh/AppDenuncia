import { alertMessage } from 'helpers/alertMessage';

export function handleFirebaseError(err) {
  let errorCode = err.code;
  let errorMessage = err.message;
  if (errorCode == "auth/email-already-exists") {
    errorMessage = "O email informado já está registrado."
  }else if (errorCode == "auth/invalid-password") {
    errorMessage = "A senha informada é inválida."
  }else if (errorCode == "auth/user-not-found") {
    errorMessage = "O email informado não está registrado."
  }else if (errorCode == "auth/wrong-password") {
    errorMessage = "Email ou senha incorretos"
  }

  alertMessage("error", "Ops", errorMessage)
}

let firebaseMap = [
  { errorCode: "auth/email-already-exists", message: "O email informado já está registrado." },
  { errorCode: "auth/invalid-password",     message: "A senha informada é inválida." },
  { errorCode: "auth/user-not-found",       message: "O email informado não está registrado." },
  { errorCode: "auth/wrong-password",       message: "Email ou senha incorretos" }
]
