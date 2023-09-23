<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

import ResponsiveBtn from '../ResponsiveBtn.vue'
import StallCard from './Stall.vue'

const props = defineProps({
  invitation: { type: Object, required: true }
})

const item = reactive(props.invitation)
const stallDialog = ref(false)
const selectedItem = reactive({ stall: {} })
const availableStalls = reactive([])

const acceptInvitation = () => {}
const declineInvitation = () => {
  console.log('REJECTED')
}
</script>

<template>
  <v-card>
    <v-card-item density="compact">
      <v-card-title>
        <v-avatar><v-img :src="item.fair.logo" /></v-avatar> {{ item.fair.name }}</v-card-title
      >
    </v-card-item>

    <v-card-text class="mt-3">
      <div v-if="item.invitation">
        <RouterLink
          :to="{ name: 'profile', params: { id: item.fair.organizer.id } }"
          class="font-weight-bold"
        >
          {{ item.fair.organizer.name }}
        </RouterLink>
        has invited you.
      </div>
      <div v-else>
        <RouterLink
          :to="{ name: 'profile', params: { id: item.company.exhibitor.id } }"
          class="font-weight-bold"
        >
          {{ item.company.exhibitor.name }}
        </RouterLink>
        representing
        <RouterLink
          :to="{ name: 'companies-show', params: { id: item.company.id } }"
          class="font-weight-bold"
        >
          {{ item.company.name }}
        </RouterLink>
        would like to participate in this event.
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <ResponsiveBtn v-if="!item.invitation" color="green" prepend text="accept" icon="done" />
      <v-dialog width="auto" v-model="stallDialog" v-else>
        <template v-slot:activator="{ props }">
          <ResponsiveBtn v-bind="props" color="green" prepend text="accept" icon="done" />
        </template>

        <v-card>
          <v-container>
            <v-card-item>
              <v-card-title class="font-weight-bold pb-3">
                <div class="d-flex align-center justify-space-between">
                  <div>Pick your stall</div>
                  <v-btn color="red" icon="close" @click="stallDialog = false" />
                </div>
              </v-card-title>
            </v-card-item>

            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="3" v-for="stall in availableStalls" :key="stall.id">
                  <StallCard
                    :stall="stall"
                    :color="selectedItem.stall.id == stall.id ? 'indigo-lighten-4' : ''"
                    @click="selectedItem.stall = stall"
                  />
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <ResponsiveBtn
                prepend
                text="send"
                :disabled="!selectedItem.stall.id"
                @click="acceptInvitation"
                icon="check"
                color="green"
              />
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>

      <ResponsiveBtn
        @click="declineInvitation"
        color="red"
        prepend
        text="decline"
        icon="thumb_down"
      />
    </v-card-actions>
  </v-card>
</template>
