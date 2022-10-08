export function nameValidator(name) {
  if (!name) return "O nome não pode ficar vazio."
  const re = /^[A-Za-z\s]*$/
  if (!re.test(name)) return 'Por favor, digite um nome e sobrenome válido!'
  return ''
}
