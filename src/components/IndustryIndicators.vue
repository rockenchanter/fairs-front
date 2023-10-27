<script setup>
defineProps({
  industries: { type: Array, required: true }
})
</script>
<template>
  <v-tooltip v-for="industry in industries" :text="industry.name" :key="industry.id">
    <template v-slot:activator="{ props }">
      <v-icon
        v-bind="props"
        class="me-2"
        :color="industry.color"
        :icon="industry.icon"
        size="x-large"
      />
    </template>
  </v-tooltip>
</template>
