<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/api.js'
import IndustryIndicators from '@/components/IndustryIndicators.vue'
import StallCard from '@/components/cards/Stall.vue'

const tab = ref('one')
const hall = ref({})
const api = useApi()
const route = useRoute()

const fetchHall = async (id) => {
  const data = await api.getHall(id)
  hall.value = data.hall
}

onMounted(() => fetchHall(route.params.id))
watch(
  () => route.params.id,
  (id) => fetchHall(id)
)
</script>

<template>
  <v-tabs v-model="tab" bg-color="primary">
    <v-tab prepend-icon="info" value="one">Information</v-tab>
    <v-tab prepend-icon="collections" value="two">Gallery</v-tab>
    <v-tab prepend-icon="storefront" value="four">Stalls</v-tab>
    <v-tab prepend-icon="event" value="three">Events</v-tab>
  </v-tabs>

  <v-container>
    <v-window v-model="tab">
      <v-window-item value="one">
        <div class="mb-5 text-h4">{{ hall.name }}</div>
        <p>{{ hall.description }}</p>
      </v-window-item>

      <v-window-item value="two">
        <v-row class="pb-2">
          <v-col cols="12" md="4" v-for="img in hall.images" :key="img.id">
            <v-card elevation="0">
              <v-img :src="img.path" />
              <v-card-item>
                <v-card-subtitle class="text-center">{{ img.description }}</v-card-subtitle>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item value="three">
        <v-row>
          <v-col class="text-right">
            <v-btn prepend-icon="home" text="house your next event" color="primary" />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="10">
            <v-timeline side="end">
              <v-timeline-item v-for="fair in hall.fairs" size="large">
                <template v-slot:icon>
                  <v-avatar size="x-large" :image="fair.organizer.image"></v-avatar>
                </template>

                <v-card>
                  <v-card-item>
                    <v-card-title class="d-flex justify-space-between align-center">
                      <v-row>
                        <v-col>
                          {{ fair.name }}
                        </v-col>
                        <v-col class="text-right"> </v-col>
                      </v-row>
                    </v-card-title>
                    <v-card-subtitle>
                      <v-icon icon="date_range" start />
                      <span>{{ fair.start_date }}</span>
                    </v-card-subtitle>

                    <div class="py-2">
                      <div class="font-weight-light text-medium-emphasis">
                        {{ fair.short_desc }}
                      </div>
                    </div>
                  </v-card-item>

                  <v-card-actions>
                    <IndustryIndicators :industries="fair.industries" />
                    <v-spacer />
                    <v-btn text="read more" :to="{ name: 'fairs-show', params: { id: fair.id } }" />
                  </v-card-actions>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item value="four">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="stall in hall.stalls" :key="hall.id">
              <StallCard :stall="stall" />
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>
