<script setup>
import IndustryIndicators from '@/components/IndustryIndicators.vue'
import { useUtils } from '@/composables/utils'

const { trim } = useUtils()

defineProps({
  company: { type: Object, required: true },
  trimText: { type: Number, required: false }
})
</script>

<template>
  <v-card :to="{ name: 'companies-show', params: { id: company.id } }">
    <v-card-item>
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
    </v-card-actions>
  </v-card>
</template>
