<script setup>
import { useText } from '@/composables/text'

const { trim } = useText()

const fairs = [
  {
    id: 1,
    name: 'Potato Fair',
    start_date: '11 August 9:00',
    image:
      'https://images.pexels.com/photos/5273080/pexels-photo-5273080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    short_desc:
      "The Potato Fair, a celebration of spuds in all their glorious forms, where you can savor everything from crispy fries to mouthwatering mashed potatoes, all while enjoying potato-themed games and activities. It's the tuber lover's paradise!",
    stalls: [
      { id: 1, amount: 0 },
      { id: 2, amount: 0 },
      { id: 3, amount: 0 }
    ],
    address: { city: 'Pabianice' }
  }
]

const availableSlots = (hall_id) =>
  fairs[hall_id].stalls.reduce((sum, stall) => (sum += stall.amount), 0)
const send_rsvp = () => null
</script>

<template>
  <v-container>
    <v-row>
      <v-col md="4" v-for="(fair, index) in fairs" :key="fair.id">
        <v-card :to="{ name: 'fairs-show', params: { id: fair.id } }">
          <v-img :src="fair.image" />
          <v-card-item>
            <v-card-title>{{ fair.name }}</v-card-title>
            <v-card-subtitle><v-icon icon="event" /> {{ fair.start_date }}</v-card-subtitle>
          </v-card-item>

          <v-card-text>{{ trim(fair.short_desc, 250) }}</v-card-text>

          <v-card-actions>
            <v-tooltip :text="availableSlots(index) ? 'Send RSVP' : 'All places booked'">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  @click.prevent="send_rsvp"
                  :icon="availableSlots(index) ? 'mail' : 'no_accounts'"
                  :color="availableSlots(index) ? 'primary' : ''"
                  :disabled="!availableSlots(index)"
                />
              </template>
            </v-tooltip>
            <v-spacer />
            <v-chip variant="outlined" prepend-icon="place">{{ fair.address.city }}</v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
