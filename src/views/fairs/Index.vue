<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'
import FairForm from '@/components/forms/Fair.vue'
import FairCard from '@/components/cards/Fair.vue'
import ResponsiveBtn from '@/components/ResponsiveBtn.vue'

const api = useApi()
const ds = useDataStore()
const dialog = ref(false)

const name = ref('')
const city = ref('')

const cities = ref([])
const fairs = ref([])

const fetchFairs = async () => {
  const params = {}
  if (name.value) params.name = name.value
  if (city.value) params.city = city.value
  const data = await api.getFairs(params)
  fairs.value = data.fairs
}

const addFair = async (fair_id) => {
  const data = await api.getFair(fair_id)
  fairs.value.push(data.fair)
  dialog.value = false
}

onMounted(async () => {
  const cts = await api.getCities(null)
  cities.value = cts.cities
  fetchFairs()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6" sm="5">
        <v-text-field v-model="name" name="name" label="Name" />
      </v-col>
      <v-col cols="6" sm="4">
        <v-select
          v-model="city"
          :items="cities"
          item-value="name"
          item-title="name"
          name="city"
          label="City"
          prepend-inner-icon="location_city"
        />
      </v-col>
      <v-col sm="3">
        <ResponsiveBtn color="red" icon="search" text="find" blockMobile @click="fetchFairs" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div v-show="fairs.length" class="text-h5">Found {{ fairs.length }} fairs</div>
      </v-col>
      <v-col class="text-right">
        <v-dialog v-model="dialog">
          <template v-slot:activator="{ props }">
            <ResponsiveBtn
              v-show="ds.roleCheck('organizer')"
              v-bind="props"
              color="primary"
              icon="add"
              text="create fair"
            />
          </template>

          <v-card class="py-3 px-5">
            <v-card-item>
              <v-card-title>Add new fair</v-card-title>
            </v-card-item>

            <v-card-text>
              <FairForm :fair="{}" @create="addFair" />
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="6" md="4" v-for="fair in fairs" :key="fair.id">
        <FairCard :fair="fair" />
      </v-col>
    </v-row>
  </v-container>
</template>
