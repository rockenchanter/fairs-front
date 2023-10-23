<script setup>
import { useUtils } from '@/composables/utils.js'
import { reactive } from 'vue'

const { trim } = useUtils()

const props = defineProps({
  hall: { type: Object, required: true },
  link: { type: Boolean, required: false }
})

const item = reactive({})

if (props.link) {
  item.to = {
    name: 'halls-show',
    params: { id: props.hall.id }
  }
}
</script>

<template>
  <v-card v-bind="item">
    <v-img v-if="hall.images[0]" :src="hall.images[0].path" />
    <v-card-item>
      <v-card-title>{{ hall.name }}</v-card-title>
      <v-card-subtitle>
        <v-tooltip text="Parking">
          <template v-slot:activator="{ props }">
            <v-icon
              v-bind="props"
              class="me-2"
              v-if="hall.parking"
              icon="local_parking"
              color="primary"
            />
          </template>
        </v-tooltip>
        <v-tooltip text="Free Wi-Fi">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" class="me-2" v-if="hall.internet" icon="wifi" color="primary" />
          </template>
        </v-tooltip>
        <v-tooltip text="Pets friendly">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" class="me-2" v-if="hall.pets" icon="pets" color="primary" />
          </template>
        </v-tooltip>
        <v-tooltip text="Accessible for everyone">
          <template v-slot:activator="{ props }">
            <v-icon
              v-bind="props"
              class="me-2"
              v-if="hall.dissability"
              icon="accessible"
              color="primary"
            />
          </template>
        </v-tooltip>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>{{ trim(hall.description, 250) }}</v-card-text>
    <v-card-actions>
      <v-chip prepend-icon="place" variant="outlined"> {{ hall.city }}, {{ hall.street }} </v-chip>
    </v-card-actions>
  </v-card>
</template>
