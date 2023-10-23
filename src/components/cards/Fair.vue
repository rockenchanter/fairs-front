<script setup>
import { computed } from 'vue'
import { useUtils } from '@/composables/utils.js'
import IndustryIndicators from '@/components/IndustryIndicators.vue'

const props = defineProps({
  fair: { type: Object, required: true }
})

const availableSlots = computed(() => {
  return props.fair.hall.stalls.reduce((sum, stall) => (sum += stall.max_amount), 0)
})
const send_request = () => null
const { trim } = useUtils()
</script>

<template>
  <v-card :to="{ name: 'fairs-show', params: { id: fair.id } }">
    <v-img :src="fair.image" />
    <v-card-item>
      <v-row>
        <v-col
          ><v-card-title>{{ fair.name }}</v-card-title></v-col
        >
        <v-col class="text-right">
          <v-tooltip>
            <template v-slot:activator="{ props }">
              <v-avatar v-bind="props" :image="fair.organizer.image" />
            </template>
            {{ fair.organizer.name }} {{ fair.organizer.surname }}
          </v-tooltip>
        </v-col>
      </v-row>

      <v-card-subtitle>
        <v-row>
          <v-col>
            <v-tooltip text="Start" location="bottom">
              <template v-slot:activator="{ props }">
                <span v-bind="props"> <v-icon color="green" icon="flag" /> {{ fair.start }}</span>
              </template>
            </v-tooltip>
          </v-col>
          <v-col class="text-right">
            <v-tooltip text="End" location="bottom">
              <template v-slot:activator="{ props }">
                <span v-bind="props">
                  <v-icon color="red" icon="flag_circle" /> {{ fair.end }}</span
                >
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <IndustryIndicators :industries="fair.industries" />
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>{{ trim(fair.description, 250) }}</v-card-text>

    <v-card-actions>
      <v-tooltip :text="availableSlots ? 'Send request' : 'All places booked'">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            @click.prevent="send_request"
            :icon="availableSlots ? 'mail' : 'no_accounts'"
            :color="availableSlots ? 'primary' : ''"
            :disabled="!availableSlots"
          />
        </template>
      </v-tooltip>
      <v-spacer />
      <v-chip variant="outlined" prepend-icon="place">{{ fair.hall.city }}</v-chip>
    </v-card-actions>
  </v-card>
</template>
