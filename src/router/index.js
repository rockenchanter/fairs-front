import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InvitationsView from '../views/Invitations.vue'
import HallsView from '../views/halls/Index.vue'
import CompaniesView from '../views/companies/Index.vue'
import FairsView from '../views/fairs/Index.vue'

import HallShowView from '../views/halls/Show.vue'
import CompanyShowView from '../views/companies/Show.vue'
import FairShowView from '../views/fairs/Show.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/profile/:id', name: 'profile', component: HomeView },

    { path: '/invitations', name: 'invitations', component: InvitationsView },

    { path: '/halls', name: 'halls-index', component: HallsView },
    { path: '/companies', name: 'companies-index', component: CompaniesView },
    { path: '/fairs', name: 'fairs-index', component: FairsView },

    { path: '/halls/:id', name: 'halls-show', component: HallShowView },
    { path: '/fairs/:id', name: 'fairs-show', component: FairShowView },
    { path: '/companies/:id', name: 'companies-show', component: CompanyShowView }
  ]
})

export default router
