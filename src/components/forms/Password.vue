<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'

const emit = defineEmits(['close'])
const api = useApi()
const ds = useDataStore()
const errors = ref({})

const sendForm = async (event) => {
  const fd = new FormData(event.target)
  const resp = await api.changePassword(fd)

  if (resp.errors) {
    errors.value = resp.errors
    console.log(resp.errors)
  } else {
    ds.showAlert('success', '', 'Password has been changed')
    emit('close')
  }
}
</script>

<template>
  <v-form @submit.prevent="sendForm">
    <v-card>
      <v-container>
        <v-card-item>
          <v-card-title>Change password</v-card-title>
        </v-card-item>

        <v-card-text>
          <v-row>
            <v-col
              ><v-text-field
                type="password"
                name="old_password"
                label="Current password"
                :error-messages="errors.old_password"
                append-inner-icon="lock_open"
            /></v-col>
          </v-row>
          <v-row>
            <v-col
              ><v-text-field
                type="password"
                name="password"
                label="New password"
                :error-messages="errors.password"
                append-inner-icon="lock"
            /></v-col>
          </v-row>
          <v-row>
            <v-col
              ><v-text-field
                type="password"
                name="password_confirmation"
                label="Confirm new password"
                :error-messages="errors.password_confirmation"
                append-inner-icon="lock"
            /></v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn type="submit" text="Change" color="primary" />
          <v-btn text="Cancel" color="red" @click="emit('close')" />
        </v-card-actions>
      </v-container>
    </v-card>
  </v-form>
</template>
