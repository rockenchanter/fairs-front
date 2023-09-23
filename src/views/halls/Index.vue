<script setup>
import HallCard from '@/components/cards/Hall.vue'
import HallForm from '@/components/forms/Hall.vue'
import { reactive, ref } from 'vue'

const halls = reactive([])
const newHallDialog = ref(false)
</script>

<template>
  <v-row align="center">
    <v-col> <div class="text-h4 my-5">List of halls</div> </v-col>
    <v-col class="text-right">
      <v-dialog v-model="newHallDialog">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" color="primary" text="add hall" prepend-icon="add hall" />
        </template>

        <v-card>
          <v-card-item>
            <v-card-title class="d-flex justify-space-between pa-2"
              >Add new hall <v-spacer /><v-btn
                @click="newHallDialog = false"
                icon="close"
                color="red"
            /></v-card-title>
          </v-card-item>

          <v-card-text>
            <HallForm :hall="{}" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="item in halls" :key="item.id">
      <HallCard :hall="item" link />
    </v-col>
  </v-row>
</template>
