<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'
import CompanyCard from '@/components/cards/Company.vue'
import CompanyForm from '@/components/forms/Company.vue'
import IndustrySelect from '@/components/IndustrySelect.vue'
import ResponsiveBtn from '@/components/ResponsiveBtn.vue'

const api = useApi()
const ds = useDataStore()
const route = useRoute()
const router = useRouter()

const companyDialog = ref(false)

const name = ref(route.query.name || '')
const industry = ref(route.query.industry || [])
const exhibitor = ref(route.query.exhibitor_id || null)
const companies = ref([])

const addCompany = (company) => {
  ds.setUserCompany(company)
  companyDialog.value = false
  companies.value.push(company)
}
const setIndustries = (newValue) => (industry.value = newValue)
const buildParams = () => {
  const params = {}
  if (name.value) params.name = name.value
  if (industry.value.length) params.industry = industry.value
  if (exhibitor.value) params.exhibitor_id = exhibitor.value
  router.push({ query: params })
  exhibitor.value = null
  return params
}

const refresh = async () => {
  const data = await api.getCompanies(buildParams())
  companies.value = data
}

watch(industry, refresh)
onMounted(async () => {
  refresh()
})
</script>

<template>
  <v-row>
    <v-col>
      <v-text-field
        v-model="name"
        name="name"
        label="Name"
        clearable
        append-inner-icon="search"
        @click:append-inner="refresh"
        @keydown.enter="refresh"
        @click:clear="refresh"
      />
    </v-col>
    <v-col>
      <IndustrySelect @update="setIndustries" />
    </v-col>
  </v-row>
  <v-row>
    <v-col v-show="companies.length">
      <div class="text-h5">Found {{ companies.length }} companies</div>
    </v-col>
    <v-col class="text-right">
      <v-dialog v-if="ds.roleCheck('exhibitor')" v-model="companyDialog">
        <template v-slot:activator="{ props }">
          <ResponsiveBtn
            icon="add"
            text="add company"
            v-bind="props"
            color="primary"
          />
        </template>

        <CompanyForm @close="addCompany" />
      </v-dialog>
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="6" md="4" v-for="company in companies" :key="company.id">
      <CompanyCard :company="company" />
    </v-col>
  </v-row>
</template>
