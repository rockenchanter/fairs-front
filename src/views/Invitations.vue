<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'
import InvitationCard from '../components/cards/Invitation.vue'

const invitations = ref([])
const api = useApi()
const ds = useDataStore()

onMounted(async () => {
  const data = await api.getInvitations()
  invitations.value = data.invitations
})
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="invitation in invitations" v-if="invitations.length">
      <InvitationCard :invitation="invitation" />
    </v-col>
    <v-col v-else>
      <v-row class="mt-5">
        <v-col class="mt-10" md="4" offset="1">
          <div v-if="ds.roleCheck('exhibitor')">
            <div>
              <div class="text-h3 mt-5 ms-4">No invitations</div>
            </div>
            <p class="blockquote">
              You can send application for any fair you want, why not do that?
            </p>
            <v-btn class="ms-5" text="Find fairs" color="red" :to="{ name: 'fairs-index' }" />
          </div>
          <div v-if="ds.roleCheck('organizer')">
            <div class="text-h4 mt-4">No requests</div>
          </div>
        </v-col>
        <v-col>
          <v-img src="/assets/empty.svg" max-height="450" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
