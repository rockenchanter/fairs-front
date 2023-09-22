export function useUtils() {
  const trim = (text, max_length) => {
    if (text.length > max_length) return text.substring(0, max_length) + '...'
    else return text
  }

  const buildName = (prepend, index, append) => `${prepend}_${index}_${append}`

  return { trim, buildName }
}
