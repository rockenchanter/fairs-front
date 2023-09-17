export function useText() {
  const trim = (text, max_length) => {
    if (text.length > max_length) return text.substring(0, 250) + '...'
    else return text
  }

  return { trim }
}
