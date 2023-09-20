<script setup>
import { reactive } from 'vue'
import { useDataStore } from '@/stores/data.js'

const props = defineProps({
  text: { type: String, required: true },
  icon: { type: String, required: true },
  prepend: { type: Boolean, required: false },
  block: { type: Boolean, required: false },
  blockMobile: { type: Boolean, required: false }
})

const btn = reactive({})
const { mobile } = useDataStore()

if (mobile && !props.blockMobile) btn.icon = props.icon
else {
  if (props.prepend) btn.prependIcon = props.icon
  else btn.appendIcon = props.icon
  btn.text = props.text
}
</script>

<template>
  <v-btn v-bind="btn" :block="block || (mobile && blockMobile)" />
</template>
