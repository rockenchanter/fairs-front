<script setup>
import { computed } from 'vue'
import { useUtils } from '@/composables/utils.js'
const props = defineProps({
  fair: { type: Object, required: true }
})

const availableSlots = computed(() =>
  props.fair.stalls.reduce((sum, stall) => (sum += stall.amount), 0)
)
const send_rsvp = () => null
const { trim } = useUtils()
</script>

<template>
  <v-card :to="{ name: 'fairs-show', params: { id: fair.id } }">
    <v-img :src="fair.image" />
    <v-card-item>
      <v-card-title>{{ fair.name }}</v-card-title>
      <v-card-subtitle><v-icon icon="event" /> {{ fair.start_date }}</v-card-subtitle>
    </v-card-item>

    <v-card-text>{{ trim(fair.short_desc, 250) }}</v-card-text>

    <v-card-actions>
      <v-tooltip :text="availableSlots ? 'Send RSVP' : 'All places booked'">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            @click.prevent="send_rsvp"
            :icon="availableSlots ? 'mail' : 'no_accounts'"
            :color="availableSlots ? 'primary' : ''"
            :disabled="!availableSlots"
          />
        </template>
      </v-tooltip>
      <v-spacer />
      <v-chip variant="outlined" prepend-icon="place">{{ fair.address.city }}</v-chip>
    </v-card-actions>
  </v-card>
</template>
