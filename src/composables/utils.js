export function useUtils() {
  const trim = (text, max_length) => {
    if (text.length > max_length) return text.substring(0, max_length) + '...'
    else return text
  }

  const buildName = (prepend, index, append) => `${prepend}_${index}_${append}`

  const deleteFromArray = (id, array) => {
    let idx = -1
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == id) {
        idx = i
        break
      }
    }
    if (idx != -1) array.splice(idx, 1)
  }

  return { trim, buildName, deleteFromArray }
}
