<script setup>
import { RouterView } from 'vue-router'
import LoginForm from '@/components/forms/Login.vue'
import RegistrationForm from '@/components/forms/Registration.vue'
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

import { useDataStore } from '@/stores/data.js'
import { useApi } from '@/composables/api.js'

const { mobile } = useDisplay()
const ds = useDataStore()
const api = useApi()

onMounted(async () => {
  ds.setMobile(mobile.value)
  const resp = await api.authenticate({ locale: 'pl' })
  if (resp.user) ds.setUser(resp.user)
})

const navigation = ref(null)
const tab = ref('login')

const links = [
  { text: 'Fairs', icon: 'celebration', url: { name: 'fairs-index' } },
  { text: 'Companies', icon: 'business', url: { name: 'companies-index' } },
  { text: 'Halls', icon: 'meeting_room', url: { name: 'halls-index' } },
  { text: 'Invitations', icon: 'mail', url: { name: 'invitations' } }
]
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="navigation = !navigation" />
      <template v-slot:append>
        <v-menu open-on-hover open-delay="0">
          <template v-slot:activator="{ props }">
            <v-avatar v-if="ds.user" class="me-2" v-bind="props">
              <v-img :src="ds.user.image" />
            </v-avatar>
          </template>

          <v-list>
            <v-list-item title="Profile" />
            <v-list-item title="Company" />
            <v-list-item title="Fairs" />
            <v-list-item title="Logout" @click="api.logout" />
          </v-list>
        </v-menu>

        <v-btn v-show="!ds.user" text="login" @click="ds.setDialog('auth', true)" />
      </template>
    </v-app-bar>

    <v-dialog :model-value="ds.authDialog">
      <v-card>
        <v-container>
          <v-tabs v-model="tab">
            <v-tab value="login" text="Sign in" />
            <v-tab value="register" text="Sign up" />
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="login">
              <LoginForm />
            </v-window-item>

            <v-window-item value="register">
              <RegistrationForm />
            </v-window-item>
          </v-window>
        </v-container>
      </v-card>
    </v-dialog>

    <v-navigation-drawer v-model="navigation">
      <v-list nav>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :title="link.text"
          :to="link.url"
          :prependIcon="link.icon"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
