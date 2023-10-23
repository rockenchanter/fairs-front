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
const dialog = ref(false)

onMounted(async () => {
  ds.setMobile(mobile.value)
  const resp = await api.authenticate({ locale: 'en' })
  if (resp.user) ds.setUser(resp.user)
  if (resp.industries) ds.setIndustries(resp.industries)
})

const navigation = ref(false)
const tab = ref('login')
const links = [
  { text: 'Fairs', icon: 'celebration', url: { name: 'fairs-index' } },
  { text: 'Companies', icon: 'business', url: { name: 'companies-index' } },
  { text: 'Halls', icon: 'meeting_room', url: { name: 'halls-index' } },
  { text: 'Invitations', icon: 'mail', url: { name: 'invitations' } }
]

const logout = () => {
  api.logout()
  dialog.value = false
}
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="navigation = !navigation" />
      <v-app-bar-title>
        <v-btn
          variant="outlined"
          color="primary"
          prepend-icon="festival"
          text="FairTime"
          :to="{ name: 'home' }"
        />
      </v-app-bar-title>
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
            <v-list-item title="Logout" @click="logout" />
          </v-list>
        </v-menu>

        <v-btn
          class="me-4"
          v-show="!ds.user"
          variant="outlined"
          prepend-icon="account_circle"
          text="sign in"
          @click="dialog = true"
        />
      </template>
    </v-app-bar>

    <v-dialog v-model="dialog">
      <v-card>
        <v-container>
          <v-tabs v-model="tab">
            <v-tab value="login" text="Sign in" />
            <v-tab value="register" text="Sign up" />
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="login">
              <LoginForm @close="dialog = false" />
            </v-window-item>

            <v-window-item value="register">
              <RegistrationForm @close="dialog = false" />
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
        <v-snackbar
          :color="ds.alertData.color"
          location="top center"
          prominent
          elevation="10"
          variant="elevated"
          closable
          :model-value="ds.alert"
          @click:close="ds.closeAlert"
        >
          <div class="font-weight-bold">{{ ds.alertData.title }}</div>
          {{ ds.alertData.text }}
        </v-snackbar>
        <RouterView />
      </v-container>
    </v-main>

    <footer class="ftr">
      <v-container class="pt-10">
        <v-row justify="space-between">
          <v-col md="3">
            <v-img src="/assets/logo.svg" />
          </v-col>

          <v-col md="4">
            <div class="text-h6">Site map</div>
            <v-list bg-color="#2F2E41">
              <v-list-item rounded :to="{ name: 'fairs-index' }">Fairs</v-list-item>
              <v-list-item rounded :to="{ name: 'companies-index' }">Companies</v-list-item>
              <v-list-item rounded :to="{ name: 'halls-index' }">Halls</v-list-item>
              <v-list-item rounded :to="{ name: 'invitations' }">Invitations</v-list-item>
              <v-list-item v-if="ds.user" rounded :to="{ name: 'profile' }">Profile</v-list-item>
            </v-list>
          </v-col>

          <v-col md="4">
            <div class="text-h6">Contact</div>
            <v-list bg-color="#2F2E41">
              <v-list-item rounded>fake.email@example.com</v-list-item>
              <v-list-item rounded>(+48) 999 999 999</v-list-item>
              <v-list-item rounded>Fake Street <br />36310 FakeCity</v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <p class="text-center">&copy; 2023 FairTime. All Rights Reserved.</p>
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </v-app>
</template>

<style>
.ftr {
  background-color: #2f2e41;
  color: white;
}
</style>
