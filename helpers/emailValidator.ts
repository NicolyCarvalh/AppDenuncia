export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email não pode ficar vazio."
  if (!re.test(email)) return 'Por favor, digite um email válido!'
  return null
}
