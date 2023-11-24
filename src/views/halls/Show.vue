<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useApi } from '@/composables/api.js'
import StallCard from '@/components/cards/Stall.vue'
import FairCard from '@/components/cards/Fair.vue'
import GoogleMap from '@/components/GoogleMap.vue'

const tab = ref('one')
const api = useApi()
const route = useRoute()
const dataFetched = ref(false)

const hall = ref({})
const address = ref({})
const fairs = ref([])

const fetchHall = async (id) => {
  dataFetched.value = false
  const data = await api.getHall(id)
  const data_fairs = await api.getFairs({ hall_id: data.id })
  address.value = {
    city: data.city,
    street: data.street,
    zipcode: data.zipcode
  }
  hall.value = data
  fairs.value = data_fairs
  dataFetched.value = true
}

onMounted(() => fetchHall(route.params.id))
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) fetchHall(to.params.id)
})
</script>

<template>
  <v-tabs v-model="tab" bg-color="primary">
    <v-tab prepend-icon="info" value="one">Information</v-tab>
    <v-tab prepend-icon="collections" value="two" v-show="hall.images && hall.images.length"
      >Gallery</v-tab
    >
    <v-tab prepend-icon="storefront" value="four" v-show="hall.stalls && hall.stalls.length"
      >Stalls</v-tab
    >
    <v-tab prepend-icon="event" value="three" v-show="fairs.length">Events</v-tab>
  </v-tabs>

  <v-container>
    <v-window v-model="tab">
      <v-window-item value="one">
        <div class="mb-2 text-h4">{{ hall.name }}</div>
        <div>
          <v-tooltip text="Parking">
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                class="me-2"
                v-if="hall.parking"
                icon="local_parking"
                color="primary"
              />
            </template>
          </v-tooltip>
          <v-tooltip text="Free Wi-Fi">
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                class="me-2"
                v-if="hall.internet"
                icon="wifi"
                color="primary"
              />
            </template>
          </v-tooltip>
          <v-tooltip text="Pets friendly">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" class="me-2" v-if="hall.pets" icon="pets" color="primary" />
            </template>
          </v-tooltip>
          <v-tooltip text="Accessible for everyone">
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                class="me-2"
                v-if="hall.dissability"
                icon="accessible"
                color="primary"
              />
            </template>
          </v-tooltip>
        </div>
        <p>{{ hall.description }}</p>
        <div class="my-5 text-h6">Hall location</div>
        <GoogleMap :address="address" v-if="dataFetched" />
      </v-window-item>

      <v-window-item value="two">
        <v-row class="pb-2">
          <v-col cols="12" md="4" v-for="img in hall.images" :key="img.id">
            <v-card elevation="0">
              <v-img :src="img.path" />
              <v-card-item>
                <v-card-subtitle class="text-center">{{ img.description }}</v-card-subtitle>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item value="three">
        <v-row class="py-4">
          <v-col md="4" v-for="fair in fairs">
            <FairCard :fair="fair" />
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item value="four">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="stall in hall.stalls" :key="hall.id">
              <StallCard :stall="stall" />
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>
