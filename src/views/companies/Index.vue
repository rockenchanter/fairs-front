<script setup>
import { ref, onMounted, watch } from 'vue'
import CompanyCard from '@/components/cards/Company.vue'
import CompanyForm from '@/components/forms/Company.vue'
import { useApi } from '@/composables/api.js'

const companies = ref([])
const api = useApi()

const addCompany = (company) => companies.value.push(company)
onMounted(async () => {
  const data = await api.getCompanies(null)
  companies.value = data.companies
})
</script>

<template>
  <v-row>
    <v-col class="text-right">
      <CompanyForm @close="addCompany" />
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="6" md="4" v-for="company in companies" :key="company.id">
      <CompanyCard :company="company" />
    </v-col>
  </v-row>
</template>
