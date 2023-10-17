import { useDataStore } from '@/stores/data.js'

export function useApi() {
  const store = useDataStore()

  const get = async (url, search_params) => {
    const params = new URLSearchParams(search_params)
    const resp = await fetch(`${url}?${params}`, { method: 'GET' })
      .then((resp) => resp.json())
      .then((json) => json)
    return resp
  }

  const post = async (url, formData) => {
    return await fetch(`${url}`, { method: 'POST', body: formData }).then((resp) => {
      if (resp.status == 403) console.log('FORBIDDEN')
      else return resp.json()
    })
  }

  const update = async (url, formData) => {
    return await fetch(`${url}`, { method: 'PATCH', body: formData }).then((resp) => {
      if (resp.status == 403) console.log('FORBIDDEN')
      else if (resp.status == 422) return resp.json()
      else if (resp.body) return resp.json()
    })
  }

  const destroy = async (url) => {
    return await fetch(url, { method: 'DELETE' }).then((resp) => {
      if (resp.status == 403) console.log('FORBIDDEN')
      else return {}
    })
  }

  return {
    authenticate: async (searchParams) => {
      return await get('/api/authenticate', searchParams)
    },
    login: async (fd) => {
      const resp = await post('/api/login', fd)
      if (!resp.errors) store.setUser(resp.user)
      return resp
    },
    logout: async () => {
      const resp = await get('/api/logout')
      store.setUser(null)
      return resp
    },
    register: async (fd) => {
      const resp = await post('/api/register', fd)
      if (!resp.errors) store.setUser(resp.user)
      return resp
    },

    getHall: async (id) => await get(`/api/halls/${id}`),
    getHalls: async (params) => await get('/api/halls/', params),

    createHall: async (fd) => await post('/api/halls/create', fd),
    createImage: async (fd) => await post('/api/images/create', fd),
    createStall: async (fd) => await post('/api/stalls/create', fd),

    updateHall: async (id, fd) => await update(`/api/halls/${id}`, fd),
    updateImage: async (id, fd) => await update(`/api/images/${id}`, fd),
    updateStall: async (id, fd) => await update(`/api/stalls/${id}`, fd),

    deleteHall: async (id) => await destroy(`/api/halls/${id}`),
    deleteImage: async (id) => await destroy(`/api/images/${id}`),
    deleteStall: async (id) => await destroy(`/api/stalls/${id}`),

    initErrors: (fields, reactive_prop) => fields.forEach((key) => (reactive_prop[key] = [])),
    setErrors: (errors, reactive_prop) => {
      for (const [key, value] of Object.entries(errors)) reactive_prop[key] = value
    }
  }
}
