<script setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/api.js'
import CompanyCard from '@/components/cards/Company.vue'
import FairForm from '@/components/forms/Fair.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

const tab = ref('one')
const item = ref({ hall: {} })
const api = useApi()
const route = useRoute()
const router = useRouter()
const confDialog = ref(false)

const fetchFair = async (id) => {
  const data = await api.getFair(id)
  item.value = data.fair
}

const deleteFair = async () => {
  api.deleteFair(item.value.id)
  router.push({ name: 'home' })
}

onMounted(() => fetchFair(route.params.id))
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) fetchFair(to.params.id)
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col md="10">
        <v-tabs v-model="tab" color="primary">
          <v-tab prepend-icon="info" value="one">Information</v-tab>
          <v-tab prepend-icon="account_circle" value="two">Guests</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-window v-model="tab">
      <v-window-item value="one">
        <v-row>
          <v-col md="8">
            <div class="mt-5 mb-2 font-weight-bold text-h4">{{ item.name }}</div>
            <p>{{ item.description }}</p>
          </v-col>
          <v-col>
            <div class="text-subtitle-2 mb-4">
              <v-tooltip text="Start" location="bottom">
                <template v-slot:activator="{ props }">
                  <span v-bind="props"> <v-icon color="green" icon="flag" /> {{ item.start }}</span>
                </template>
              </v-tooltip>
            </div>

            <div class="text-subtitle-2 mb-4">
              <v-tooltip text="End" location="bottom">
                <template v-slot:activator="{ props }">
                  <span v-bind="props">
                    <v-icon color="red" icon="flag_circle" /> {{ item.end }}</span
                  >
                </template>
              </v-tooltip>
            </div>
            <div class="text-subtitle-2 mb-4">
              <v-icon icon="place" /> {{ item.hall.city }}, {{ item.hall.street }}
            </div>
            <div class="text-subtitle-2 mb-4">
              <v-icon icon="location_city" /> {{ item.hall.name }}
            </div>

            <v-btn-group v-if="!item.published">
              <v-dialog>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" append-icon="edit" color="green" text="edit" />
                </template>

                <v-card>
                  <v-card-item>
                    <v-card-title>Edit fair</v-card-title>
                  </v-card-item>
                  <v-card-text>
                    <FairForm :id="item.id" />
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-btn append-icon="delete" color="red" text="delete" @click="confDialog = true" />
              <ConfirmationDialog
                :visible="confDialog"
                @accept="deleteFair"
                @decline="confDialog = false"
              />
            </v-btn-group>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item value="two">
        <v-row>
          <v-col md="6" v-for="company in item.companies" :key="company.id">
            <CompanyCard :company="company" trimText="150" />
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>
