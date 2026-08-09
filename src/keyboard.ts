export function answerIndexForKey(key: string, optionCount: number) {
  if (!/^[a-z]$/i.test(key)) return null
  const index = key.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)
  return index >= 0 && index < optionCount ? index : null
}
