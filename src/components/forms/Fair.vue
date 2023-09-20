<script setup>
import { reactive, ref } from 'vue'
import UpdateCreateBtn from '../UpdateCreateBtn.vue'
import ResponsiveBtn from '../ResponsiveBtn.vue'
import HallCard from '../cards/Hall.vue'

const props = defineProps({
  fair: { type: Object, required: true }
})

const halls = [
  {
    id: 1,
    name: 'Arabasta Hall',
    description: 'Arabasta Hall awesome description lies here before your very eyes stranger',
    image:
      'https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    address: { id: 1, city: 'Rzeszów', street: 'Pigonia 1', zipcode: '13-333' }
  },
  {
    id: 2,
    name: 'Ginto Hall',
    description: 'Ginto Hall awesome description lies here before your very eyes stranger',
    image:
      'https://images.pexels.com/photos/18245680/pexels-photo-18245680/free-photo-of-escalators-in-hall-of-the-shopping-mall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    address: { id: 1, city: 'Warszawa', street: 'Piłsudskiego 10', zipcode: '33-333' }
  },
  {
    id: 3,
    name: 'Kanjo Hall',
    description: 'Kanjo Hall awesome description lies here before your very eyes stranger',
    image:
      'https://images.pexels.com/photos/3831826/pexels-photo-3831826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    address: { id: 1, city: 'Poznań', street: 'Mickiewicza 101', zipcode: '23-333' }
  }
]

const item = reactive(props.fair)
const city = ref('')
const tab = ref('one')
const selectHall = (id) => {
  item.hall_id = id
  console.log(id)
}

const sendForm = (event) => {
  console.log(new FormData(event.target))
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
              ><v-text-field v-model.trim="item.name" name="name" label="Name"
            /></v-col>
            <v-col cols="12" md="4"
              ><v-file-input
                prepend-icon=""
                prepend-inner-icon="photo_camera"
                v-model="item.image"
                accept="image/*"
                name="image"
                label="Logo/image"
            /></v-col>
            <v-col cols="12" md="4"
              ><v-select
                multiple
                prepend-inner-icon="construction"
                v-model="item.industries"
                name="industry"
                label="Industries"
            /></v-col>
          </v-row>

          <v-row>
            <v-col
              ><v-textarea
                v-model.trim="item.short_desc"
                name="short_desc"
                label="Description"
                hint="It will be visible on cards"
              />
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="two">
          <v-row align="center">
            <v-col cols="12" md="3">
              <v-text-field
                variant="solo"
                v-model="item.start_date"
                label="Start date"
                type="date"
                name="start_date"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="solo"
                v-model="item.end_date"
                label="End date"
                type="date"
                name="end_date"
              />
            </v-col>
            <v-col cols="12" md="3"
              ><v-select prepend-inner-icon="location_city" v-model="city" label="City"
            /></v-col>
            <v-col cols="12" md="3"
              ><ResponsiveBtn text="find" color="red" icon="search" blockMobile
            /></v-col>
          </v-row>

          <v-row>
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
        <v-col>
          <ResponsiveBtn
            v-if="tab != 'one'"
            color="indigo"
            @click="tab = 'one'"
            text="back"
            prepend
            icon="navigate_before"
          />
        </v-col>
        <v-col class="text-right">
          <ResponsiveBtn
            color="indigo"
            @click="tab = 'two'"
            v-if="tab != 'two'"
            text="next"
            icon="navigate_next"
          />
          <UpdateCreateBtn v-else new_rec type="submit" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
