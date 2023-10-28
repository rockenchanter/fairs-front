<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUtils } from '@/composables/utils.js'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'
import IndustryIndicators from '@/components/IndustryIndicators.vue'

const props = defineProps({
  fair: { type: Object, required: true },
  deletable: { type: Boolean, required: false }
})

const api = useApi()
const route = useRoute()
const ds = useDataStore()
const can_send_request = ref(true)

const availableSlots = computed(() => {
  return props.fair.hall.stalls.reduce((sum, stall) => (sum += stall.max_amount), 0)
})
const send_request = async (is_request) => {
  const fd = new FormData()
  const fid = props.fair.id
  const cid = route.params.id || ds.user.company.id
  fd.append('fair_id', fid)
  fd.append('company_id', ds.user.company.id)
  let data = null
  if (is_request) data = await api.createInvitation(fd)
  else data = await api.deleteInvitation(cid, fid)
  can_send_request.value = false

  if (!data.errors && is_request) {
    ds.showAlert('success', null, 'Request has been sent')
  } else {
    if (data.errors) ds.showAlert('error', data.errors.invitation, 'We could not proceed')
  }
}

const { trim } = useUtils()
</script>

<template>
  <v-card :to="{ name: 'fairs-show', params: { id: fair.id } }">
    <v-img :src="fair.image" />
    <v-card-item>
      <template v-slot:append>
        <v-tooltip>
          <template v-slot:activator="{ props }">
            <v-avatar v-bind="props" :image="fair.organizer.image" />
          </template>
          {{ fair.organizer.name }} {{ fair.organizer.surname }}
        </v-tooltip>
      </template>
      <v-card-title>{{ fair.name }}</v-card-title>

      <v-card-subtitle class="mt-2">
        <v-tooltip text="Start" location="bottom">
          <template v-slot:activator="{ props }">
            <span v-bind="props" class="me-3">
              <v-icon color="green" icon="flag" /> {{ fair.start }}</span
            >
          </template>
        </v-tooltip>
        <v-tooltip text="End" location="bottom">
          <template v-slot:activator="{ props }">
            <span v-bind="props"> <v-icon color="red" icon="flag_circle" /> {{ fair.end }}</span>
          </template>
        </v-tooltip>
        <div class="mt-2">
          <IndustryIndicators :industries="fair.industries" />
        </div>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>{{ trim(fair.description, 250) }}</v-card-text>

    <v-card-actions>
      <v-tooltip :text="availableSlots ? 'Send request' : 'All places booked'">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            @click.prevent="send_request(1)"
            :icon="availableSlots ? 'mail' : 'no_accounts'"
            :color="availableSlots ? 'primary' : ''"
            :disabled="!availableSlots || !can_send_request"
            v-if="!deletable && ds.roleCheck('exhibitor')"
          />
        </template>
      </v-tooltip>
      <v-tooltip :text="ds.roleCheck('organizer') ? 'Remove company' : 'Cancel visit'">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            @click.prevent="send_request(0)"
            icon="cancel"
            color="red"
            :disabled="!can_send_request"
            v-if="deletable"
          />
        </template>
      </v-tooltip>
      <v-spacer />
      <v-chip variant="outlined" prepend-icon="place">{{ fair.hall.city }}</v-chip>
    </v-card-actions>
  </v-card>
</template>
