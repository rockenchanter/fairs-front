<script setup>
import CompanyCard from '@/components/cards/Company.vue'
import { reactive } from 'vue'

const companies = reactive([])
</script>

<template>
  <v-row>
    <v-col md="4" v-for="company in companies" :key="company.id">
      <CompanyCard :company="company" />
    </v-col>
  </v-row>
</template>
