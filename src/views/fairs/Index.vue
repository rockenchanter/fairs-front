<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'
import FairForm from '@/components/forms/Fair.vue'
import FairCard from '@/components/cards/Fair.vue'
import ResponsiveBtn from '@/components/ResponsiveBtn.vue'
import IndustrySelect from '@/components/IndustrySelect.vue'

const api = useApi()
const ds = useDataStore()
const route = useRoute()
const router = useRouter()

const dialog = ref(false)
const name = ref(route.query.name)
const city = ref(route.query.city)
const organizer_id = ref(route.query.organizer_id)

const cities = ref([])
const fairs = ref([])
const industry = ref(route.query.industry || [])
const setIndustries = (newValue) => (industry.value = newValue)

const buildParams = () => {
  const params = {}
  if (organizer_id.value) params.organizer_id = organizer_id.value
  if (name.value) params.name = name.value
  if (city.value) params.city = city.value
  if (industry.value.length) params.industry = industry.value
  return params
}

const fetchFairs = async (params) => {
  const data = await api.getFairs(params)
  fairs.value = data
}

const refresh = () => {
  const params = buildParams()
  delete params.organizer_id
  router.push({ query: params })
  fetchFairs(params)
}

const addFair = async (fair_id) => {
  const data = await api.getFair(fair_id)
  fairs.value.push(data)
  dialog.value = false
}

watch(city, refresh)
watch(industry, refresh)
watch(
  () => route.query.organizer_id,
  (neww, old) => {
    if (neww) {
      name.value = null
      fetchFairs({ organizer_id: neww })
    }
  }
)

onMounted(async () => {
  const cts = await api.getCities(null)
  cities.value = cts.cities
  fetchFairs(buildParams())
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="4">
        <v-text-field
          v-model="name"
          name="name"
          label="Name"
          clearable
          append-inner-icon="search"
          @click:append-inner="refresh"
          @keydown.enter="refresh"
          @click:clear="refresh"
        />
      </v-col>
      <v-col cols="6" md="4">
        <v-select
          v-model="city"
          clearable
          :items="cities"
          item-value="name"
          item-title="name"
          name="city"
          label="City"
          prepend-inner-icon="location_city"
        />
      </v-col>
      <v-col md="4">
        <IndustrySelect @update="setIndustries" />
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
