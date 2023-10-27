<script setup>
import { reactive } from 'vue'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'

const api = useApi()
const ds = useDataStore()

const data = reactive({})
const errors = reactive({})
const emit = defineEmits(['close'])
api.initErrors(['email', 'password'], errors)

const sendForm = async (event) => {
  api.initErrors(['email', 'password'], errors)
  const resp = await api.login(new FormData(event.target))
  if (resp.errors) api.setErrors(resp.errors, errors)
  else emit('close')
}
</script>

<template>
  <v-form @submit.prevent="sendForm">
    <v-container>
      <v-row>
        <v-col
          ><v-text-field
            v-model.trim="data.email"
            type="email"
            prepend-inner-icon="email"
            name="email"
            label="Email"
        /></v-col>
      </v-row>
      <v-row>
        <v-col
          ><v-text-field
            v-model.trim="data.password"
            type="password"
            prepend-inner-icon="lock"
            name="password"
            label="Password"
          /><span v-show="errors.generic" class="text-subtitle-2 text-red">
            {{ errors.generic }}</span
          ></v-col
        >
      </v-row>
      <v-row>
        <v-col><v-btn type="submit" text="login" /></v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
>
