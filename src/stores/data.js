import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataStore = defineStore('data', () => {
  const cities = [
    'Los Angeles',
    'New York',
    'Seattle',
    'Baltimore',
    'Las Vegas',
    'San Diego',
    'Dallas'
  ]
  const mobile = ref(false)

  const setMobile = (newValue) => {
    mobile.value = newValue
  }

  return { cities, mobile, setMobile }
})
