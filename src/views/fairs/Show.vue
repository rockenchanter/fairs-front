<script setup>
import CompanyCard from '@/components/cards/Company.vue'
import { ref } from 'vue'

defineProps({
  fair: { type: Object, required: true }
})

const tab = ref('one')
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col md="8">
        <v-tabs v-model="tab">
          <v-tab prepend-icon="info" value="one">Information</v-tab>
          <v-tab prepend-icon="account_circle" value="two">Guests</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col md="8">
        <v-window v-model="tab">
          <v-window-item value="one">
            <div class="mt-5 mb-2 font-weight-bold text-h4">{{ fair.name }}</div>
            <div class="text-subtitle-2 mb-4"><v-icon icon="event" /> {{ fair.start_date }}</div>
            <p>{{ fair.short_desc }}</p>
          </v-window-item>

          <v-window-item value="two">
            <v-row>
              <v-col md="6" v-for="company in fair.companies" :key="company.id">
                <CompanyCard :company="company" trimText="150" />
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>
