<script setup>
import { onMounted, reactive, ref } from 'vue'
import ResponsiveBtn from '../ResponsiveBtn.vue'
import HallCard from '../cards/Hall.vue'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'

const props = defineProps({
  fair: { type: Object, required: false },
  id: { type: Number, required: false }
})

const api = useApi()
const ds = useDataStore()
const errors = reactive({})

const item = ref(props.fair || {})
const tab = ref('one')
const cities = ref({})
const selectHall = (id) => (item.value.hall_id = id)

const halls = ref({})
const city = ref('')
const emit = defineEmits(['create'])

onMounted(async () => {
  if (props.id) {
    const dt = await api.getFair(props.id)
    item.value = dt
  } else {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 30)
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
    const day = currentDate.getDate().toString().padStart(2, '0')
    item.value.start = item.value.end = `${year}-${month}-${day}`
  }
  const data = await api.getCities({})
  cities.value = data.cities
})

const toggle = () => {
  if (!item.value.industries || item.value.industries.length != ds.industries.length)
    item.value.industries = ds.industries
  else item.value.industries = []
}

const findHalls = async () => {
  item.value.hall_id = null
  const params = { start: item.value.start, end_date: item.value.end }
  if (city.value) params.city = city.value
  const data = await api.getHalls(params)
  halls.value = data
}

const sendForm = async (event) => {
  const fd = new FormData(event.target)
  api.initErrors(['hall_id', 'image', 'industries', 'name', 'description', 'start', 'end'], errors)
  if (item.value.id) {
    const data = await api.updateFair(item.value.id, fd)
    if (data.errors) api.setErrors(data.errors, errors)
    else {
      errors.value = {}
      ds.showAlert('success', 'Fair has been updated')
    }
  } else {
    const data = await api.createFair(fd)
    if (data.errors) {
      api.setErrors(data.errors, errors)
    } else {
      event.target.reset()
      emit('create', data.id)
    }
  }
}
</script>

<template>
  <v-form @submit.prevent="sendForm">
    <v-text-field type="hidden" v-model.number="item.hall_id" name="hall_id" />
    <v-container>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-row>
            <v-col cols="12" md="4"
              ><v-text-field
                :error-messages="errors.name"
                v-model.trim="item.name"
                name="name"
                label="Name"
            /></v-col>
            <v-col cols="12" md="4" v-if="!item.id"
              ><v-file-input
                :error-messages="errors.image"
                prepend-icon=""
                prepend-inner-icon="photo_camera"
                v-model="item.image"
                accept="image/*"
                name="image"
                label="Image"
            /></v-col>
            <v-col cols="12" md="4">
              <v-select
                :error-messages="errors.industries"
                v-model="item.industries"
                name="industry"
                :items="ds.industries"
                multiple
                item-title="name"
                item-value="id"
                label="Industries"
              >
                <template v-slot:prepend-item>
                  <v-list-item title="Select All" @click="toggle" />
                  <v-divider class="mt-2"></v-divider>
                </template>

                <template v-slot:selection="{ item }">
                  <v-icon :icon="item.raw.icon" :color="item.raw.color" />
                </template>

                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props">
                    <template v-slot:prepend>
                      <v-icon :icon="item.raw.icon" :color="item.raw.color" />
                    </template>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              ><v-textarea
                v-model.trim="item.description"
                :error-messages="errors.description"
                name="description"
                label="Description"
                hint="It will be visible on cards"
              />
            </v-col>
          </v-row>
          <v-row class="ms-2">
            <v-col
              ><v-switch
                v-model="item.published"
                name="published"
                label="Publish fair"
                color="primary"
                persistent-hint
                hint="Edition or deletion is disabled for published fair"
            /></v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="two">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                variant="solo"
                :error-messages="errors.start"
                v-model="item.start"
                label="Start date"
                type="date"
                name="start"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                variant="solo"
                :error-messages="errors.end"
                v-model="item.end"
                label="End date"
                type="date"
                name="end"
              />
            </v-col>
            <v-col cols="12" md="4"
              ><v-select
                prepend-inner-icon="location_city"
                v-model="city"
                :items="cities"
                item-value="city"
                item-title="city"
                label="City"
            /></v-col>
          </v-row>
          <v-row v-show="errors.hall_id ? errors.hall_id.length : false">
            <v-col
              ><span class="text-red text-caption"> {{ errors.hall_id }}</span></v-col
            >
          </v-row>
          <v-row>
            <v-col>
              <ResponsiveBtn
                v-if="tab != 'one'"
                color="indigo"
                @click="tab = 'one'"
                text="back"
                prepend
                icon="navigate_before"
                block
                blockMobile
              />
            </v-col>
            <v-col>
              <ResponsiveBtn
                text="find"
                color="red"
                icon="search"
                block
                blockMobile
                @click="findHalls"
                :disabled="!item.start || !item.end"
              />
            </v-col>
            <v-col>
              <ResponsiveBtn
                text="save"
                color="primary"
                icon="save"
                block
                blockMobile
                type="submit"
                :disabled="!item.hall_id"
              />
            </v-col>
          </v-row>

          <v-row class="py-3">
            <v-col md="4" v-for="hall in halls" :key="hall.id">
              <HallCard
                :hall="hall"
                :color="item.hall_id == hall.id ? 'primary' : ''"
                @click.stop.prevent="selectHall(hall.id)"
              />
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>

      <v-row class="mt-3">
        <v-col class="text-right">
          <ResponsiveBtn
            color="indigo"
            @click="tab = 'two'"
            v-if="tab != 'two'"
            text="next"
            icon="navigate_next"
            blockMobile
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
