<script setup>
import { useText } from '@/composables/text'
import { reactive } from 'vue'

const { trim } = useText()

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
    <v-img :src="hall.image" />
    <v-card-title>{{ hall.name }}</v-card-title>
    <v-card-text>{{ trim(hall.description, 250) }}</v-card-text>
    <v-card-actions>
      <v-chip prepend-icon="place" variant="outlined">
        {{ hall.address.city }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>
