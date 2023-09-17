<template>
  <div class="text-h4 my-5">List of halls</div>
  <v-row>
    <v-col md="4" v-for="item in halls" :key="item.id">
      <v-card>
        <v-img :src="item.image" />
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-text>{{ trim(item.description, 250) }}</v-card-text>
        <v-card-actions>
          <v-chip prepend-icon="place" variant="outlined">
            {{ item.address.city }}
          </v-chip>
          <v-spacer />
          <v-btn text="read more" :to="{ name: 'halls-show', params: { id: item.id } }" />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useText } from '@/composables/text'

const { trim } = useText()

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
</script>
