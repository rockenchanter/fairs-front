<script setup>
import { useDataStore } from '@/stores/data.js'

const store = useDataStore()
</script>

<template>
  {{ store.getUser }}
</template>
