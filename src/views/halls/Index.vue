<script setup>
import HallCard from '../../components/cards/Hall.vue'
import HallForm from '../../components/forms/Hall.vue'
import { reactive, ref } from 'vue'

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

const newHall = reactive({
  stalls: [],
  images: [
    {
      id: 1,
      description: 'First image',
      path: 'https://images.pexels.com/photos/3831826/pexels-photo-3831826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      description: 'First image',
      path: 'https://images.pexels.com/photos/3831826/pexels-photo-3831826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      description: 'First image',
      path: 'https://images.pexels.com/photos/3831826/pexels-photo-3831826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 4,
      description: 'First image',
      path: 'https://images.pexels.com/photos/3831826/pexels-photo-3831826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 5,
      description: 'First image',
      path: 'https://images.pexels.com/photos/3831826/pexels-photo-3831826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 6,
      description: 'First image',
      path: 'https://images.pexels.com/photos/3831826/pexels-photo-3831826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ]
})

const newHallDialog = ref(false)
</script>

<template>
  <v-row align="center">
    <v-col> <div class="text-h4 my-5">List of halls</div> </v-col>
    <v-col class="text-right">
      <v-dialog v-model="newHallDialog">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" color="primary" text="add hall" prepend-icon="add hall" />
        </template>

        <v-card>
          <v-card-item>
            <v-card-title class="d-flex justify-space-between pa-2"
              >Add new hall <v-spacer /><v-btn
                @click="newHallDialog = false"
                icon="close"
                color="red"
            /></v-card-title>
          </v-card-item>

          <v-card-text>
            <HallForm :hall="newHall" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="item in halls" :key="item.id">
      <HallCard :hall="item" link />
    </v-col>
  </v-row>
</template>
