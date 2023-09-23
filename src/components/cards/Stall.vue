<script setup>
import ResponsiveBtn from '../ResponsiveBtn.vue'

defineProps({
  stall: { type: Object, required: true },
  actions: { type: Boolean, required: false }
})
</script>

<template>
  <v-card>
    <v-img :src="stall.image" />
    <v-card-item>
      <v-card-title class="text-right">
        <v-chip prepend-icon="attach_money" variant="outlined">
          {{ stall.price }}
        </v-chip>
      </v-card-title>
    </v-card-item>
    <v-card-text>
      <div class="d-flex flex-wrap">
        <v-chip
          class="mt-2 me-2"
          :prepend-icon="stall.network ? 'wifi' : 'wifi_off'"
          :color="stall.network ? 'green' : 'red'"
          >Network</v-chip
        >
        <v-chip
          class="mt-2 me-2"
          :prepend-icon="stall.electricity ? 'power' : 'power_off'"
          :color="stall.electricity ? 'green' : 'red'"
          >Electricity</v-chip
        >
        <v-chip
          class="mt-2 me-2"
          :prepend-icon="stall.support ? 'support_agent' : 'block'"
          :color="stall.support ? 'green' : 'red'"
          >Staff support</v-chip
        >

        <v-tooltip text="Stall size">
          <template v-slot:activator="{ props }">
            <v-chip v-bind="props" class="mt-2 me-2" prepend-icon="aspect_ratio" color="blue">{{
              stall.size
            }}</v-chip>
          </template>
        </v-tooltip>

        <v-tooltip :text="!actions ? 'Total number of stalls' : 'Currently available stalls'">
          <template v-slot:activator="{ props }">
            <v-chip v-bind="props" class="mt-2 me-2" prepend-icon="tag" color="teal-darken-4">{{
              actions ? stall.amount : stall.max_amount
            }}</v-chip>
          </template>
        </v-tooltip>
      </div>
    </v-card-text>
  </v-card>
</template>
