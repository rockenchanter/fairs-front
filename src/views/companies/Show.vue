<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/api.js'
import IndustryIndicators from '@/components/IndustryIndicators.vue'
import CompanyForm from '@/components/forms/Company.vue'

const company = ref({ exhibitor: {}, industries: [] })
const api = useApi()
const route = useRoute()

const fetchCompany = async (id) => {
  const data = await api.getCompany(id)
  company.value = data.company
}
onMounted(() => fetchCompany(route.params.id))
watch(
  () => route.params.id,
  (id) => fetchCompany(id)
)
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
        <p v-html="company.description"></p>
      </v-col>

      <v-col>
        <div class="text-h5 my-4">Find us here</div>
        <v-card
          v-for="fair in company.fairs"
          class="my-4 d-flex justify-start flex-wrap"
          :key="fair.id"
          :to="{ name: 'fairs-show', params: { id: fair.id } }"
        >
          <v-avatar rounded="0" size="80">
            <v-img :src="fair.logo" />
          </v-avatar>
          <v-card-item>
            <div class="text-subtitle-2 font-weight-bold">{{ fair.name }}</div>
            <v-card-subtitle>{{ fair.name }} </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
