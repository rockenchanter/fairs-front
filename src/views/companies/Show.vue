<script setup>
import IndustryIndicators from '@/components/IndustryIndicators.vue'

defineProps({
  company: { type: Object, required: true }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="7">
        <v-row align="center" class="mb-1">
          <v-col md="8">
            <span class="text-h5">
              <v-avatar :image="company.logo" size="x-large" /> {{ company.name }}</span
            >
          </v-col>
          <v-col class="text-right">
            <v-tooltip :text="company.exhibitor.name">
              <template v-slot:activator="{ props }">
                <v-avatar v-bind="props" size="large" :image="company.exhibitor.image" />
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
        <div class="mb-5">
          <IndustryIndicators :industries="company.industries" />
        </div>
        <p v-html="company.short_desc"></p>
      </v-col>

      <v-col>
        <div class="text-h5 my-4">Find us here</div>
        <v-card
          v-for="fair in company.fairs"
          class="my-4 d-flex justify-start flex-wrap"
          :key="fair.id"
          :to="{ name: 'fairs-show', params: { id: fair.id } }"
        >
          <v-avatar rounded="0" size="80">
            <v-img :src="fair.logo" />
          </v-avatar>
          <v-card-item>
            <div class="text-subtitle-2 font-weight-bold">{{ fair.name }}</div>
            <v-card-subtitle>{{ fair.name }} </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
