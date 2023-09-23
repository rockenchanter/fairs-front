<script setup>
import { reactive } from 'vue'
import InvitationCard from '../components/cards/Invitation.vue'

const invitations = reactive([])
</script>

<template>
  <v-row>
    <v-col cols="12" md="4" v-for="invitation in invitations">
      <InvitationCard :invitation="invitation" />
    </v-col>
  </v-row>
</template>
