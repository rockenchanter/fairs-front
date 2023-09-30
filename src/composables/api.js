import { useDataStore } from '@/stores/data.js'

export function useApi() {
  const store = useDataStore()
  return {
    authenticate: async (searchParams) => {
      const params = new URLSearchParams(searchParams)
      const resp = await fetch('/api/authenticate?' + params, { method: 'GET' })
        .then((resp) => resp.json())
        .then((json) => json)
      return resp
    },
    login: async (fd) => {
      const resp = await fetch('/api/login', { method: 'POST', body: fd }).then((resp) =>
        resp.json()
      )
      if (!resp.errors) store.setUser(resp.user)
      return resp
    },
    logout: async () => {
      const resp = await fetch('/api/logout', { method: 'GET' }).then((resp) => resp.json())
      store.setUser(null)
      return resp
    },
    register: async (fd) => {
      const resp = await fetch('/api/register', { method: 'POST', body: fd })
        .then((resp) => resp.json())
        .then((json) => json)
      if (!resp.errors) store.setUser(resp.user)
      return resp
    },

    initErrors: (fields, reactive_prop) => fields.forEach((key) => (reactive_prop[key] = [])),
    setErrors: (errors, reactive_prop) => {
      for (const [key, value] of Object.entries(errors)) reactive_prop[key] = value
    }
  }
}
