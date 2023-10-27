<script setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores/data.js'

const emit = defineEmits(['update'])
const props = defineProps({
  errors: { type: Array, required: false },
  selected: { type: Array, required: false },
  pickAll: { type: Boolean, required: false }
})
const ds = useDataStore()

const items = ref(props.selected || [])
const toggle = () => {
  if (items.value.length != ds.industries.length) items.value = ds.industries
  else items.value = []
}
</script>

<template>
  <v-select
    v-if="ds.industries"
    v-model="items"
    label="Industries"
    item-title="name"
    item-value="id"
    multiple
    clearable
    :error-messages="errors"
    :items="ds.industries"
    @update:model-value="emit('update', items)"
  >
    <template v-slot:prepend-item v-if="pickAll">
      <v-list-item title="Select All" @click="toggle" />
      <v-divider class="mt-2"></v-divider>
    </template>

    <template v-slot:selection="{ item }">
      <v-icon :icon="item.raw.icon" :color="item.raw.color" />
    </template>

    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props">
        <template v-slot:prepend>
          <v-icon :icon="item.raw.icon" :color="item.raw.color" />
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>
