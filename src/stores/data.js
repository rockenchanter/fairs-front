import { defineStore } from 'pinia'
import { reactive, computed, watch } from 'vue'

export const useDataStore = defineStore('data', () => {
  const data = reactive({
    mobile: false,
    user: null,
    industries: null,
    dialogs: {
      auth: false,
      hall: false
    },
    alert: {
      visible: false,
      color: null,
      text: ''
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
  const industries = computed(() => data.industries)
  const alertData = computed(() => data.alert)
  const alert = computed(() => data.alert.visible)
  const roleCheck = (role) => data.user && data.user.role == role

  const setMobile = (newValue) => (data.mobile = newValue)
  const setUser = (newUser) => (data.user = newUser)
  const setUserCompany = (cmpny) => (data.user.company = cmpny)
  const setIndustries = (newData) => (data.industries = newData)
  const showAlert = (type, text) => {
    data.alert.visible = true
    data.alert.text = text
    if (type == 'error') {
      data.alert.title = 'Something went really bad...'
      data.alert.color = 'red'
    }
    if (type == 'success') {
      data.alert.title = 'Hurray! All went well'
      data.alert.color = 'green'
    }
    if (type != 'error') setTimeout(() => closeAlert(), 5000)
  }

  const closeAlert = () => (data.alert.visible = false)

  return {
    mobile,
    user,
    industries,
    roleCheck,
    setMobile,
    setUser,
    setUserCompany,
    setIndustries,
    alert,
    alertData,
    showAlert,
    closeAlert
  }
})
