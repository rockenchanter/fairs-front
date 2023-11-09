<script setup>
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import HallCard from '@/components/cards/Hall.vue'
import HallForm from '@/components/forms/Hall.vue'

// composables
const api = useApi()
const ds = useDataStore()
const route = useRoute()
const router = useRouter()

// variables
const cities = ref([])
const halls = reactive([])
const hall_id = ref(null)
const dialog = ref(false)
const confDialog = ref(false)
const headers = [
  { title: 'Id', key: 'id' },
  { title: 'Name', key: 'name' },
  { align: 'end', title: 'Price', key: 'price' },
  { align: 'end', title: 'Size', key: 'size' },
  { align: 'center', title: 'Public', key: 'public' },
  { title: 'City', key: 'city' },
  { title: 'Actions', key: 'actions', sortable: false }
]

// search parameters
const name = ref(route.query.name)
const city = ref(route.query.city)

// computed props and functions
const visible_halls = computed(() => {
  const data = []
  for (let h of halls) if (h.public == 'true') data.push(h)
  return data
})

const convertHall = (hall) => {
  const bools = ['parking', 'pets', 'public', 'internet', 'dissability']
  for (let b of bools) hall[b] = hall[b].toString()
  return hall
}

const openHallDialog = (item_id) => {
  hall_id.value = null
  if (item_id) {
    hall_id.value = item_id
  }
  dialog.value = true
}

const openConfDialog = (item_id) => {
  confDialog.value = true
  if (item_id) {
    hall_id.value = item_id
  }
}

const deleteHall = () => {
  confDialog.value = false
  api.deleteHall(hall_id.value)
  let idx = -1
  for (let i = 0; i < halls.length; i++) {
    if (halls[i].id == hall_id.value) {
      idx = i
      break
    }
  }
  if (idx != -1) halls.splice(idx, 1)
}

const addItem = (item) => {
  halls.push(item)
  dialog.value = false
}

const replaceItem = async (id) => {
  const item = await api.getHall(id)
  for (let i = 0; i < halls.length; i++) {
    if (halls[i].id == id) {
      halls[i] = convertHall(item)
    }
  }
}

const fetchHalls = async (params) => {
  const data = await api.getHalls(params)
  halls.splice(0)
  for (let h of data) {
    halls.push(convertHall(h))
  }
}

const find = () => {
  const params = {}
  if (name.value) params.name = name.value
  if (city.value) params.city = city.value
  router.push({ query: params })
  fetchHalls(params)
}

onMounted(async () => {
  fetchHalls({})
  const cdata = await api.getCities(null)
  cities.value = cdata.cities
})

watch(city, find)
</script>

<template>
  <div v-if="ds.roleCheck('administrator')">
    <v-dialog v-model="dialog">
      <v-card>
        <HallForm :id="hall_id" @close="addItem" @update="replaceItem" />
      </v-card>
    </v-dialog>

    <ConfirmationDialog @accept="deleteHall" @decline="confDialog = false" :visible="confDialog" />

    <v-row>
      <v-col>
        <v-data-table density="compact" :headers="headers" :items="halls">
          <template v-slot:top>
            <v-toolbar color="primary" title="Halls" rounded>
              <v-spacer />
              <v-btn
                @click="openHallDialog(null)"
                text="create hall"
                color="white"
                variant="elevated"
              />
            </v-toolbar>
          </template>

          <template v-slot:item.public="{ item }">
            <v-icon
              :icon="item.selectable.public == 'true' ? 'done' : 'close'"
              :color="item.selectable.public == 'true' ? 'green' : 'red'"
            />
          </template>
          <template v-slot:item.actions="{ item }">
            <RouterLink :to="{ name: 'halls-show', params: { id: item.raw.id } }"
              ><v-icon icon="visibility" color="blue"
            /></RouterLink>
            <v-icon class="mx-2" icon="edit" color="orange" @click="openHallDialog(item.raw.id)" />
            <v-icon icon="delete" color="red" @click="openConfDialog(item.raw.id)" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>

  <div v-else>
    <v-row align="center">
      <v-col>
        <v-text-field
          v-model.trim="name"
          name="name"
          label="Name"
          clearable
          append-inner-icon="search"
          @click:append-inner="find"
          @keydown.enter="find"
          @click:clear="find"
        />
      </v-col>
      <v-col>
        <v-select
          :items="cities"
          clearable
          item-value="name"
          name="city"
          label="City"
          item-title="name"
          v-model="city"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="item in visible_halls" :key="item.id">
        <HallCard :hall="item" link />
      </v-col>
    </v-row>
  </div>
</template>
