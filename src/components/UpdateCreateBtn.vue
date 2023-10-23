<script setup>
import ResponsiveBtn from './ResponsiveBtn.vue'

const props = defineProps({
  new_rec: { type: Boolean, required: false }
})
</script>

<template>
  <ResponsiveBtn
    :text="new_rec ? 'create' : 'update'"
    :icon="new_rec ? 'save' : 'update'"
    :color="new_rec ? 'primary' : 'green'"
    prepend
  />
</template>
