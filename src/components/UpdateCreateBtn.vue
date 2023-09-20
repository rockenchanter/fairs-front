<script setup>
import ResponsiveBtn from './ResponsiveBtn.vue'

defineProps({
  new_rec: { type: Boolean, required: true }
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
