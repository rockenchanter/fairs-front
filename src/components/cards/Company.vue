<script setup>
import IndustryIndicators from '@/components/IndustryIndicators.vue'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'
import { useUtils } from '@/composables/utils'
import { ref } from 'vue'

const { trim } = useUtils()
const api = useApi()
const ds = useDataStore()
const block_invite = ref(false)
const block_delete = ref(false)

const props = defineProps({
  company: { type: Object, required: true },
  trimText: { type: Number, required: false },
  invite: { type: Boolean, required: false },
  deletable: { type: Boolean, required: false },
  invitable: { type: Boolean, required: false, default: true },
  fair: { type: Number, required: false }
})

const inviteCompany = async () => {
  const fd = new FormData()
  fd.append('fair_id', props.fair)
  fd.append('company_id', props.company.id)
  const data = await api.createInvitation(fd)
  if (!data.errors) ds.showAlert('success', '', 'Invitation has been sent')
  else ds.showAlert('error', null, data.errors.invitation)
  block_invite.value = true
}

const removeCompany = async () => {
  const cid = props.company.id
  const fid = props.fair
  const data = await api.deleteInvitation(cid, fid)
  if (data.errors) ds.showAlert('error', null, data.errors.invitation)
  else ds.showAlert('success', null, 'Company has been removed from fair')
  block_delete.value = true
}
</script>

<template>
  <v-card :to="{ name: 'companies-show', params: { id: company.id } }">
    <v-card-item>
      <template v-slot:append>
        <v-tooltip>
          <template v-slot:activator="{ props }">
            <v-avatar v-bind="props" :image="company.exhibitor.image" />
          </template>
          {{ company.exhibitor.name }} {{ company.exhibitor.surname }}
        </v-tooltip>
      </template>
      <v-card-title>
        <v-avatar :image="company.image" size="large" /> {{ company.name }}
      </v-card-title>
    </v-card-item>
    <v-card-subtitle
      ><v-icon icon="place" /> {{ company.addresses[0].city }},
      {{ company.addresses[0].street }}</v-card-subtitle
    >

    <v-card-text>
      {{ trim(company.description, trimText ? trimText : 250) }}
    </v-card-text>

    <v-card-actions>
      <IndustryIndicators :industries="company.industries" />
      <v-spacer />
          <v-tooltip text="Send invitation">
              <template v-show="invite" v-slot:activator="{props}" v-if="invitable">
                  <v-btn v-bind="props" color="green" icon="add" @click.prevent="inviteCompany" :disabled="block_invite" />
              </template>
          </v-tooltip>
      <v-btn
        v-show="deletable"
        icon="delete_forever"
        color="red"
        @click.prevent="removeCompany"
        :disabled="block_delete"
      />
    </v-card-actions>
  </v-card>
</template>
