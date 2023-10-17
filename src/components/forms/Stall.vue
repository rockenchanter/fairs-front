<script setup>
import { reactive } from 'vue'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'

const props = defineProps({
  stall: { type: Object, required: false },
  id: { type: Number, required: false }
})

const api = useApi()
const ds = useDataStore()
const item = reactive(props.stall || {})
const id = item.hall_id || props.id
const errors = reactive({})
const emit = defineEmits(['delete', 'create'])

const sendForm = async (event) => {
  const fd = new FormData(event.target)
  api.initErrors(['electricity', 'network', 'support', 'image', 'max_amount', 'size'], errors)
  if (props.stall) {
    const data = await api.updateStall(item.id, fd)
    if (data.errors) api.setErrors(data.errors.stall, errors)
    else ds.showAlert('success', 'Stall has been updated')
  } else {
    const data = await api.createStall(fd)
    if (data.errors) api.setErrors(data.errors.stall, errors)
    else {
      event.target.reset()
      emit('create', data.stall)
    }
  }
}

const deleteStall = () => {
  api.deleteStall(item.id)
  emit('delete', item.id)
}
</script>

<template>
  <v-form @submit.prevent="sendForm">
    <input type="hidden" :value="id" name="hall_id" />

    <!-- update -->
    <div v-if="item.id">
      <v-row
        ><v-col><v-img :src="item.image" max-height="200px" /></v-col
      ></v-row>
      <v-row>
        <v-col cols="4">
          <v-switch
            color="primary"
            v-model="item.electricity"
            label="Electricity"
            name="electricity"
          />
        </v-col>
        <v-col cols="4">
          <v-switch color="primary" v-model="item.network" label="Network" name="network" />
        </v-col>
        <v-col cols="4">
          <v-switch color="primary" v-model="item.support" label="Support" name="support" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-text-field
            :error-messages="errors.size"
            type="number"
            v-model.number="item.size"
            label="Size"
            name="size"
        /></v-col>
        <v-col>
          <v-btn-group>
            <v-btn icon="update" color="green" type="submit" />
            <v-btn v-if="!props.id" icon="delete" color="red" @click="deleteStall()" />
          </v-btn-group>
        </v-col>
      </v-row>
    </div>

    <!-- create -->
    <div v-else>
      <v-row>
        <v-col>
          <v-text-field
            :error-messages="errors.size"
            type="number"
            v-model.number="item.size"
            label="Size"
            name="size"
          />
          <v-text-field
            v-if="!item.id"
            type="number"
            :error-messages="errors.max_amount"
            v-model.number="item.max_amount"
            label="Amount"
            name="max_amount"
          />
          <v-file-input
            v-if="!item.id"
            :error-messages="errors.image"
            accept="image/*"
            prepend-icon=""
            prepend-inner-icon="photo_camera"
            v-model="item.image"
            label="Image"
            name="image"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-switch
            color="primary"
            v-model="item.electricity"
            label="Electricity"
            name="electricity"
          />
        </v-col>
        <v-col cols="4">
          <v-switch color="primary" v-model="item.network" label="Network" name="network" />
        </v-col>
        <v-col cols="4">
          <v-switch color="primary" v-model="item.support" label="Support" name="support" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn-group>
            <v-btn icon="save" color="primary" type="submit" />
          </v-btn-group>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>
