import { defineStore } from 'pinia'
import { reactive, computed, watch } from 'vue'

export const useDataStore = defineStore('data', () => {
  const data = reactive({
    mobile: false,
    user: null,
    dialogs: {
      auth: false
    }
  })

  watch(
    () => data.user,
    (newValue, _) => {
      if (newValue != null) data.dialogs.auth = false
    }
  )

  const mobile = computed(() => data.mobile)
  const user = computed(() => data.user)

  const setMobile = (newValue) => (data.mobile = newValue)
  const setUser = (newUser) => (data.user = newUser)
  const setDialog = (dialog, value) => (data.dialogs[dialog] = value)

  const authDialog = computed(() => data.dialogs.auth)

  return {
    mobile,
    user,
    setMobile,
    setUser,
    authDialog,
    setDialog
  }
})
