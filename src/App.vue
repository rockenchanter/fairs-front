<script setup>
import { RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

import LoginForm from '@/components/forms/Login.vue'
import RegistrationForm from '@/components/forms/Registration.vue'
import { useDataStore } from '@/stores/data.js'
import { useApi } from '@/composables/api.js'

const api = useApi()
const ds = useDataStore()
const router = useRouter()
const { mobile } = useDisplay()

const dataLoaded = ref(false)
const dialog = ref(false)
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
  router.push({ name: 'home' })
  dialog.value = false
}

onMounted(async () => {
  ds.setMobile(mobile.value)
  if (!dataLoaded.value) {
    dataLoaded.value = true
    const resp = await api.authenticate({ locale: 'en' })
    if (resp.user) ds.setUser(resp.user)
    if (resp.industries) ds.setIndustries(resp.industries)
  }
})
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
        <v-menu open-on-hover open-delay="0" v-if="ds.user">
          <template v-slot:activator="{ props }">
            <v-avatar class="me-2" v-bind="props">
              <v-img :src="ds.user.image" />
            </v-avatar>
          </template>

          <v-list>
            <v-list-item disabled>
              <v-list-item-title>{{ ds.user.name }} {{ ds.user.surname }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="ds.roleCheck('exhibitor') && ds.user.company"
              :to="{ name: 'companies-show', params: { id: ds.user.company.id } }"
              title="Company"
            />
            <v-list-item
              v-if="ds.roleCheck('organizer')"
              :to="{ name: 'fairs-index', query: { organizer_id: ds.user.id } }"
              title="Fairs"
            />
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

    <v-main class="full">
      <v-container>
        <div class="alert-wrapper">
          <v-alert
            :color="ds.alertData.color"
            prominent
            elevation="10"
            variant="elevated"
            closable
            :type="ds.alertData.type"
            :model-value="ds.alert"
            :text="ds.alertData.text"
            :title="ds.alertData.title"
            @click:close="ds.closeAlert"
            class="positioned-alert"
          />
        </div>
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
              <v-list-item
                v-if="ds.user"
                rounded
                :to="{ name: 'profile', params: { id: ds.user.id } }"
                >Profile</v-list-item
              >
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

.full {
  min-height: 100vh;
}

.alert-wrapper {
  position: fixed;
  right: 5vw;
  z-index: 100;
}
</style>
