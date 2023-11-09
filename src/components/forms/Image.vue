<script setup>
import { reactive } from 'vue'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'

const props = defineProps({
  image: { type: Object, required: false },
  id: { type: Number, required: false }
})

const ds = useDataStore()
const api = useApi()
const item = reactive(props.image || {})
const id = item.hall_id || props.id
const errors = reactive({})
const emit = defineEmits(['create', 'delete'])

const sendForm = async (event) => {
  const fd = new FormData(event.target)
  api.initErrors(['description', 'path'], errors)
  if (props.image) {
    const data = await api.updateImage(item.id, fd)
    if (data.errors) api.setErrors(data.errors, errors)
    else {
      ds.showAlert('success', 'Image has been updated')
    }
  } else {
    const data = await api.createImage(fd)
    if (data.errors) api.setErrors(data.errors, errors)
    else {
      event.target.reset()
      ds.showAlert('success', 'Image has been saved')
      emit('create', data)
    }
  }
}

const deleteImage = () => {
  api.deleteImage(item.id)
  emit('delete', item.id)
}
</script>

<template>
  <v-form @submit.prevent="sendForm">
    <input type="hidden" name="hall_id" :value="id" />

    <v-row v-if="props.id">
      <v-col>
        <v-file-input
          :error-messages="errors.path"
          label="Image"
          prepend-icon=""
          prepend-inner-icon="photo_camera"
          v-model="item.path"
          name="path"
          accept="image/*"
        />
        <v-text-field
          :error-messages="errors.description"
          label="Description"
          v-model.trim="item.description"
          name="description"
        />
        <v-btn icon="save" color="primary" type="submit" />
      </v-col>
    </v-row>

    <v-row v-else justify="start">
      <v-col>
        <v-row>
          <v-col>
            <v-img :src="item.path" max-height="200px" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="8">
            <v-text-field
              :error-messages="errors.description"
              label="Description"
              v-model.trim="item.description"
              name="description"
          /></v-col>
          <v-col>
            <v-btn-group>
              <v-btn icon="update" color="green" type="submit" />
              <v-btn v-if="!props.id" icon="delete" color="red" @click="deleteImage()" />
            </v-btn-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>
