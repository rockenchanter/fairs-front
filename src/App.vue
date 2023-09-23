<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

import { useDataStore } from '@/stores/data.js'

const { mobile } = useDisplay()
const ds = useDataStore()

onMounted(() => ds.setMobile(mobile.value))

const navigation = ref(null)

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
            <v-avatar class="me-2" v-bind="props">
              <v-img
                src="https://images.pexels.com/photos/698532/pexels-photo-698532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </v-avatar>
          </template>

          <v-list>
            <v-list-item title="Profile" />
            <v-list-item title="Company" />
            <v-list-item title="Fairs" />
            <v-list-item title="Logout" />
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

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
