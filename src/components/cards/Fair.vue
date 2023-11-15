<script setup>
import { ref, computed } from 'vue'

import { useUtils } from '@/composables/utils.js'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'
import ResponsiveBtn from '@/components//ResponsiveBtn.vue'
import IndustryIndicators from '@/components/IndustryIndicators.vue'

const props = defineProps({
  fair: { type: Object, required: true }
})

const api = useApi()
const ds = useDataStore()
const companies_ids = ref([])
const clicked = ref([])
const deleted = ref([])
const mode = ref('')
const responseDialog = ref(null)

for (let cmpny of ds.companies) companies_ids.value.push(cmpny.id)

const deletable = computed(() => {
  if (!ds.user || ds.user.role == 'administrator') return false
  if (ds.user.role == 'organizer' && ds.user.id != props.fair.organizer_id) return false
  let has_invitation = false
  for (let pxy of props.fair.fair_proxies) {
    if (companies_ids.value.includes(pxy.company_id)) {
      has_invitation = true
      break
    }
  }
  return has_invitation
})

const prepare_data = (fair_id, company_id) => {
  const fd = new FormData()
  fd.append('fair_id', fair_id)
  fd.append('company_id', company_id)
  return fd
}
const send_request = async (company_id) => {
  const fd = prepare_data(props.fair.id, company_id)
  let data = await api.createInvitation(fd)
  if (!data.errors) ds.showAlert('success', null, 'Request has been sent')
  else {
    responseDialog.value = false
    ds.showAlert('error', data.errors.invitation, 'We could not proceed')
  }
  clicked.value.push(company_id)
}

const delete_invite = async (company_id) => {
  api.deleteInvitation(company_id, props.fair.id)
  deleted.value.push(company_id)
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
      <v-dialog v-model="responseDialog">
        <template v-slot:activator="{ props }">
          <v-btn v-if="deletable" v-bind="props" @click.prevent="mode = 'delete'">
            <v-icon color="red" icon="delete_forever" />
            <v-tooltip
              activator="parent"
              :text="deletable && ds.roleCheck('organizer') ? 'Remove company' : 'Cancel visit'"
            />
          </v-btn>
          <v-btn v-bind="props" @click.prevent="mode = 'send'" v-show="ds.roleCheck('exhibitor')">
            <v-icon color="primary" icon="mail" />
            <v-tooltip activator="parent" text="Send request" />
          </v-btn>
        </template>

        <v-card>
          <v-card-item>
            <v-card-title>{{ !deletable ? 'Send request' : 'Cancel visit' }}</v-card-title>
          </v-card-item>

          <v-card-text>
            <v-list>
              <v-list-item v-for="item in ds.companies" :key="item.id">
                <v-list-item-title class="font-weight-bold">{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  <IndustryIndicators :industries="item.industries" />
                </v-list-item-subtitle>
                <template v-slot:prepend>
                  <v-avatar :image="item.image" />
                </template>
                <template v-slot:append>
                  <ResponsiveBtn
                    @click="mode == 'delete' ? delete_invite(item.id) : send_request(item.id)"
                    :disabled="
                      mode == 'delete' ? deleted.includes(item.id) : clicked.includes(item.id)
                    "
                    :text="mode == 'delete' ? 'Delete' : 'Send'"
                    :icon="mode == 'delete' ? 'delete_forever' : 'send'"
                    :color="mode == 'delete' ? 'red' : 'primary'"
                  />
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-spacer />
      <v-chip variant="outlined" prepend-icon="place">{{ fair.hall.city }}</v-chip>
    </v-card-actions>
  </v-card>
</template>
