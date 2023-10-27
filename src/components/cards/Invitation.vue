<script setup>
import { reactive, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'

import ResponsiveBtn from '../ResponsiveBtn.vue'
import StallCard from './Stall.vue'
import { computed } from 'vue'

const props = defineProps({
  invitation: { type: Object, required: true }
})

const api = useApi()
const ds = useDataStore()
const item = reactive(props.invitation)
const stallDialog = ref(false)
const selectedItem = ref({})
const stalls = ref([])
const respondable = ref(true)

const decision = ref(0)

onMounted(async () => {
  const data = await api.getStalls({ hall_id: item.fair.hall_id })
  stalls.value = data.stalls
})

const availableStalls = computed(() => {
  const dt = []

  for (let stall of stalls.value) {
    if (stall.amount > 0) dt.push(stall)
  }

  return dt
})

const sendResponse = async () => {
  const fd = new FormData()
  fd.append('fair_id', item.fair_id)
  fd.append('company_id', item.company_id)
  fd.append('decision', decision.value)
  if (selectedItem.value.id) fd.append('stall_id', selectedItem.value.id)

  const data = await api.updateInvitation(fd)
  if (!data.errors) {
    if (stallDialog.value) stallDialog.value = false
    respondable.value = false
    ds.showAlert('success', '', 'Success')
  }
}

const acceptRequest = () => {
  decision.value = 1
  sendResponse()
}

const acceptInvitation = () => {
  decision.value = 1
  sendResponse()
}

const declineInvitation = () => {
  decision.value = 2
  sendResponse()
}
</script>

<template>
  <v-card>
    <v-img :src="item.fair.image" />
    <v-card-item density="compact">
      <v-card-title>{{ item.fair.name }}</v-card-title>
    </v-card-item>

    <v-card-text class="mt-3">
      <!-- invitation -->
      <div v-if="item.invitation || (!item.stall_id && item.status == 1)">
        <RouterLink
          :to="{ name: 'profile', params: { id: item.fair.organizer_id } }"
          class="font-weight-bold"
        >
          {{ item.fair.organizer.name }}
          {{ item.fair.organizer.surname }}
        </RouterLink>
        has invited you.
      </div>

      <!-- request -->
      <div v-else>
        <RouterLink
          :to="{ name: 'profile', params: { id: item.company.exhibitor_id } }"
          class="font-weight-bold"
        >
          {{ item.company.exhibitor.name }} {{ item.company.exhibitor.surname }}
        </RouterLink>
        representing
        <RouterLink
          :to="{ name: 'companies-show', params: { id: item.company.id } }"
          class="font-weight-bold"
        >
          {{ item.company.name }}
        </RouterLink>
        would like to participate in this event.
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <ResponsiveBtn
        v-if="!item.invitation && item.status == 0"
        color="green"
        prepend
        text="accept"
        icon="done"
        @click="acceptRequest"
      />

      <v-dialog width="auto" v-model="stallDialog" v-else>
        <template v-slot:activator="{ props }">
          <ResponsiveBtn
            v-bind="props"
            color="green"
            prepend
            text="accept"
            icon="done"
            :disabled="!respondable"
          />
        </template>

        <v-card>
          <v-container>
            <v-card-item>
              <v-card-title class="font-weight-bold pb-3">
                <div class="d-flex align-center justify-space-between">
                  <div>Pick your stall</div>
                  <v-btn color="red" icon="close" @click="stallDialog = false" />
                </div>
              </v-card-title>
            </v-card-item>

            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                  v-for="stall in availableStalls"
                  :key="stall.id"
                  v-if="availableStalls.length"
                >
                  <StallCard
                    :stall="stall"
                    :color="selectedItem.id == stall.id ? 'indigo-lighten-4' : ''"
                    @click="selectedItem = stall"
                  />
                </v-col>
                <v-col v-else class="text-center">
                  <v-img src="/assets/empty.svg" />
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <ResponsiveBtn
                prepend
                text="send"
                :disabled="!selectedItem.id"
                @click="acceptInvitation"
                icon="check"
                color="green"
              />
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>

      <ResponsiveBtn
        :disabled="!respondable"
        @click="declineInvitation"
        color="red"
        prepend
        text="decline"
        icon="thumb_down"
      />
    </v-card-actions>
  </v-card>
</template>
