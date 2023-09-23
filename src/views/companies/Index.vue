<script setup>
import CompanyCard from '@/components/cards/Company.vue'
import CompanyForm from '@/components/forms/Company.vue'
import { reactive } from 'vue'

const company = reactive({})
</script>

<template>
  <v-card>
    <v-card-item>
      <v-card-title>Add company</v-card-title>
    </v-card-item>

    <v-card-text>
      <CompanyForm :company="company" />
    </v-card-text>
  </v-card>

  <v-row>
    <v-col md="4" v-for="company in companies" :key="company.id">
      <CompanyCard :company="company" />
    </v-col>
  </v-row>
</template>
