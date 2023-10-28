<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'
import IndustryIndicators from '@/components/IndustryIndicators.vue'
import CompanyForm from '@/components/forms/Company.vue'
import FairCard from '@/components/cards/Fair.vue'
import ResponsiveBtn from '@/components/ResponsiveBtn.vue'

const company = ref({ exhibitor: {}, industries: [] })
const api = useApi()
const ds = useDataStore()
const route = useRoute()
const fairs = ref([])
const tab = ref('one')
const editForm = ref(false)

const fetchCompany = async (id) => {
  const data = await api.getCompany(id)
  const f = await api.getFairs({ company_id: data.company.id })
  company.value = data.company
  fairs.value = f.fairs
}
onMounted(() => fetchCompany(route.params.id))
watch(
  () => route.params.id,
  (neww, old) => {
    if (neww && neww != old) fetchCompany(neww)
  }
)
</script>

<template>
  <v-row>
    <v-col>
      <v-tabs v-model="tab">
        <v-tab prepend-icon="info" text="Information" value="one" />
        <v-tab v-if="fairs.length" prepend-icon="festival" text="Fairs" value="two" />
      </v-tabs>
    </v-col>
  </v-row>

  <v-window v-model="tab" class="mt-5">
    <v-window-item value="one">
      <v-row>
        <v-col cols="12" md="10">
          <v-row align="center" class="mb-1">
            <v-col md="10">
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
            <div>
              <v-dialog v-model="editForm">
                <template v-slot:activator="{ props }">
                  <ResponsiveBtn
                    v-bind="props"
                    icon="edit"
                    color="blue"
                    text="edit"
                    v-if="ds.roleCheck('exhibitor') && company.exhibitor_id == ds.user.id"
                  />
                </template>
                <CompanyForm :id="company.id" @update="fetchCompany" />
              </v-dialog>
            </div>
          </div>
          <p>{{ company.description }}</p>
        </v-col>
      </v-row>
    </v-window-item>

    <v-window-item value="two">
      <v-row>
        <v-col sm="6" md="4" v-for="fair in fairs" :id="fair.id">
          <FairCard :fair="fair" deletable />
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>
</template>
