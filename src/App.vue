<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const navigation = ref(null)

const links = [
  { text: 'Fairs', icon: 'celebration', url: { name: 'fairs-index' } },
  { text: 'Companies', icon: 'business', url: { name: 'companies-index' } },
  { text: 'Halls', icon: 'meeting_room', url: { name: 'halls-index' } }
]
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="navigation = !navigation" />
      <v-app-bar-title>Fairs</v-app-bar-title>
      <template v-slot:append>
        <v-avatar>
          <v-img
            src="https://images.pexels.com/photos/698532/pexels-photo-698532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </v-avatar>
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
