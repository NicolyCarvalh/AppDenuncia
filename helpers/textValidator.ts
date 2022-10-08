export function textValidator(text) {
  if (!text) return "O texto não pode ficar vazio."
  if (text.length < 5) return 'O texto é muito curto'
  return null
}
