<script setup>
import { reactive } from 'vue'
import { useApi } from '@/composables/api.js'

const api = useApi()

const data = reactive({})
const errors = reactive({})
api.initErrors(['name', 'surname', 'email', 'password', 'image'], errors)

const sendForm = async (event) => {
  api.initErrors(['name', 'surname', 'email', 'password', 'image'], errors)
  const resp = await api.register(new FormData(event.target))
  if (resp.errors) api.setErrors(resp.errors, errors)
}

const roles = ['exhibitor', 'organizer']
data.role = roles[0]
</script>

<template>
  <v-form @submit.prevent="sendForm">
    <v-container>
      <v-row>
        <v-col
          ><v-text-field
            :error-messages="errors.name"
            v-model.trim="data.name"
            name="name"
            label="First name"
        /></v-col>
        <v-col
          ><v-text-field
            :error-messages="errors.surname"
            v-model.trim="data.surname"
            name="surname"
            label="Last name"
        /></v-col>
      </v-row>
      <v-row>
        <v-col
          ><v-text-field
            :error-messages="errors.email"
            v-model.trim="data.email"
            type="email"
            prepend-inner-icon="email"
            name="email"
            label="Email"
        /></v-col>
        <v-col
          ><v-text-field
            :error-messages="errors.password"
            v-model.trim="data.password"
            type="password"
            prepend-inner-icon="lock"
            name="password"
            label="Password"
        /></v-col>
      </v-row>
      <v-row>
        <v-col
          ><v-file-input
            :error-messages="errors.image"
            v-model="data.image"
            type="file"
            accept="image/*"
            name="image"
            label="Image/avatar"
            prepend-inner-icon="photo_camera"
            prepend-icon=""
        /></v-col>
        <v-col
          ><v-select
            :items="roles"
            v-model="data.role"
            name="role"
            label="Role"
            prepend-inner-icon="photo_camera"
        /></v-col>
      </v-row>
      <v-row>
        <v-col><v-btn color="primary" type="submit" text="register" /></v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
