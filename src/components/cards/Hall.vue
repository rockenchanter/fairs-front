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
        <v-tooltip text="Price in USD">
          <template v-slot:activator="{ props }">
            <span v-bind="props" class="me-3"
              ><v-icon icon="attach_money" color="green" /> {{ hall.price }}</span
            >
          </template>
        </v-tooltip>
        <v-tooltip text="Size in square feet">
          <template v-slot:activator="{ props }">
            <span v-bind="props">
              <v-icon icon="square_foot" color="orange" /> {{ hall.size }}
            </span>
          </template>
        </v-tooltip>
      </v-card-subtitle>
      <v-card-subtitle>
        <v-tooltip text="Parking">
          <template v-slot:activator="{ props }">
            <v-icon
              v-bind="props"
              class="me-2"
              v-if="hall.parking == 'true'"
              icon="local_parking"
              color="primary"
            />
          </template>
        </v-tooltip>
        <v-tooltip text="Free Wi-Fi">
          <template v-slot:activator="{ props }">
            <v-icon
              v-bind="props"
              class="me-2"
              v-if="hall.internet == 'true'"
              icon="wifi"
              color="primary"
            />
          </template>
        </v-tooltip>
        <v-tooltip text="Pets friendly">
          <template v-slot:activator="{ props }">
            <v-icon
              v-bind="props"
              class="me-2"
              v-if="hall.pets == 'true'"
              icon="pets"
              color="primary"
            />
          </template>
        </v-tooltip>
        <v-tooltip text="Accessible for everyone">
          <template v-slot:activator="{ props }">
            <v-icon
              v-bind="props"
              class="me-2"
              v-if="hall.dissability == 'true'"
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
