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
    login: async (fd) => {
      const resp = await post('/api/login', fd)
      if (!resp.errors) store.setUser(resp.user)
      return resp
    },
    logout: async () => {
      get('/api/logout')
      store.setUser(null)
    },
    register: async (fd) => {
      const resp = await post('/api/register', fd)
      if (!resp.errors) store.setUser(resp.user)
      return resp
    },
    authenticate: async (params) => await get('/api/authenticate', params),

    getHall: async (id) => await get(`/api/halls/${id}`),
    getCompany: async (id) => await get(`/api/companies/${id}`),
    getFair: async (id) => await get(`/api/fairs/${id}`),
    getHalls: async (params) => await get('/api/halls', params),
    getCompanies: async (params) => await get('/api/companies', params),
    getFairs: async (params) => await get(`/api/fairs`, params),
    getCities: async (params) => await get('/api/halls/cities', params),
    getStalls: async (params) => await get('/api/halls/stalls', params),
    getInvitations: async (params) => await get('/api/invitations', params),

    createHall: async (fd) => await post('/api/halls/create', fd),
    createImage: async (fd) => await post('/api/images/create', fd),
    createStall: async (fd) => await post('/api/stalls/create', fd),
    createAddress: async (fd) => await post('/api/addresses/create', fd),
    createCompany: async (fd) => await post('/api/companies/create', fd),
    createFair: async (fd) => await post('/api/fairs/create', fd),
    createInvitation: async (fd) => await post('/api/invitations/create', fd),

    updateHall: async (id, fd) => await update(`/api/halls/${id}`, fd),
    updateImage: async (id, fd) => await update(`/api/images/${id}`, fd),
    updateStall: async (id, fd) => await update(`/api/stalls/${id}`, fd),
    updateAddress: async (id, fd) => await update(`/api/addresses/${id}`, fd),
    updateCompany: async (id, fd) => await update(`/api/companies/${id}`, fd),
    updateFair: async (id, fd) => await update(`/api/fairs/${id}`, fd),
    updateInvitation: async (fd) => await update(`/api/invitations`, fd),

    deleteHall: async (id) => await destroy(`/api/halls/${id}`),
    deleteImage: async (id) => await destroy(`/api/images/${id}`),
    deleteStall: async (id) => await destroy(`/api/stalls/${id}`),
    deleteAddress: async (id) => await destroy(`/api/addresses/${id}`),
    deleteCompany: async (id) => await destroy(`/api/companies/${id}`),
    deleteFair: async (id) => await destroy(`/api/fairs/${id}`),
    deleteInvitation: async (cid, fid) =>
      await destroy(`/api/invitations?company_id=${cid}&fair_id=${fid}`),

    initErrors: (fields, reactive_prop) => fields.forEach((key) => (reactive_prop[key] = [])),
    setErrors: (errors, reactive_prop) => {
      for (const [key, value] of Object.entries(errors)) reactive_prop[key] = value
    }
  }
}
