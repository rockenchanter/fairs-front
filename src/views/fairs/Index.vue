<script setup>
import FairForm from '@/components/forms/Fair.vue'
import FairCard from '@/components/cards/Fair.vue'
import { ref, reactive } from 'vue'

const cities = ref([])
const name = ref('')
const fairs = reactive([])
</script>

<template>
  <v-container>
    <v-form>
      <v-row align="center">
        <v-col cols="6">
          <v-text-field v-model="name" name="name" label="Name" append-inner-icon="search" />
        </v-col>
        <v-col cols="6">
          <v-select v-model="cities" name="city" label="City" prepend-inner-icon="location_city" />
        </v-col>
        <v-col class="text-right">
          <v-dialog>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" color="primary" append-icon="add" text="create new fair" />
            </template>

            <v-card class="py-3 px-5">
              <v-card-item>
                <v-card-title>Add new fair</v-card-title>
              </v-card-item>

              <v-card-text>
                <FairForm :fair="{}" />
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col md="4" v-for="(fair, index) in fairs" :key="fair.id">
        <FairCard :fair="fair" />
      </v-col>
    </v-row>
  </v-container>
</template>
