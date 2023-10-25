<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useApi } from '@/composables/api.js'
import IndustryIndicators from '@/components/IndustryIndicators.vue'
import CompanyForm from '@/components/forms/Company.vue'
import FairCard from '@/components/cards/Fair.vue'

const company = ref({ exhibitor: {}, industries: [] })
const api = useApi()
const route = useRoute()
const fairs = ref([])

const fetchCompany = async (id) => {
  const data = await api.getCompany(id)
  const f = await api.getFairs({ company_id: data.company.id })
  company.value = data.company
  fairs.value = f.fairs
}
onMounted(() => fetchCompany(route.params.id))
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) fetchCompany(to.params.id)
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="7">
        <v-row align="center" class="mb-1">
          <v-col md="8">
            <span class="text-h5">
              <v-avatar :image="company.image" size="x-large" /> {{ company.name }}</span
            >
          </v-col>
          <v-col class="text-right">
            <v-tooltip>
              <template v-slot:activator="{ props }">
                <v-avatar v-bind="props" size="large" :image="company.exhibitor.image" />
              </template>
              {{ company.exhibitor.name }} {{ company.exhibitor.surname }}
            </v-tooltip>
          </v-col>
        </v-row>
        <div class="mb-5">
          <IndustryIndicators :industries="company.industries" />
          <v-spacer class="mb-2" />
          <CompanyForm :id="company.id" @update="fetchCompany" />
        </div>
        <p>{{ company.description }}</p>
      </v-col>

      <v-col>
        <div class="text-h5 my-4">Find us here</div>
        <v-row>
          <v-col sm="6" md="4" v-for="fair in fairs" :id="fair.id">
            <FairCard :fair="fair" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
