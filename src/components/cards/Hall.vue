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
    <v-card-title>{{ hall.name }}</v-card-title>
    <v-card-text>{{ trim(hall.description, 250) }}</v-card-text>
    <v-card-actions>
      <v-chip prepend-icon="place" variant="outlined">
        {{ hall.city }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>
