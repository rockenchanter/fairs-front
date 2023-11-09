<script setup>
import { reactive, ref, onMounted } from 'vue'

import { useApi } from '@/composables/api.js'
import { useUtils } from '@/composables/utils.js'
import ImageForm from '@/components/forms/Image.vue'
import StallForm from '@/components/forms/Stall.vue'
import ResponsiveBtn from '@/components/ResponsiveBtn.vue'

const props = defineProps({
  id: { type: Number, required: false }
})
const emit = defineEmits(['close', 'update'])
const errors = reactive({ address: {} })

const item = ref({})
const api = useApi()
const utils = useUtils()
const tab = ref('one')

const sendForm = async (event) => {
  const fd = new FormData(event.target)
  api.initErrors(['name', 'price', 'street', 'city', 'zipcode', 'description', 'size'], errors)
  if (item.value.id) {
    const data = await api.updateHall(item.value.id, fd)
    if (data.errors) api.setErrors(data.errors, errors)
    else emit('update', data.id)
  } else {
    const data = await api.createHall(fd)
    if (data.errors) api.setErrors(data.errors, errors)
    else emit('close', data)
  }
}

const addImage = async (image) => {
  item.value.images.push(image)
}

const addStall = async (stall) => {
  item.value.stalls.push(stall)
}

const deleteStall = (id) => {
  const stalls = item.value.stalls
  utils.deleteFromArray(id, stalls)
}

const deleteImage = (id) => {
  const ims = item.value.images
  utils.deleteFromArray(id, ims)
}

onMounted(async () => {
  if (props.id != null) {
    const data = await api.getHall(props.id)
    if (data) item.value = data
  }
})

if (!item.address) item.address = {}
</script>

<template>
  <v-form @submit.prevent="sendForm">
    <v-container>
      <v-row>
        <v-col>
          <v-tabs v-model="tab">
            <v-tab value="one">General</v-tab>
            <v-tab v-if="props.id" value="two">Images</v-tab>
            <v-tab v-if="props.id" value="three">Stalls</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-window v-model="tab" class="pa-2">
            <v-window-item value="one">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.trim="item.name"
                    :error-messages="errors.name"
                    name="name"
                    label="Name"
                  />
                  <v-row>
                    <v-col>
                      <v-text-field
                        type="number"
                        :error-messages="errors.price"
                        v-model.number="item.price"
                        name="price"
                        label="Price"
                    /></v-col>
                    <v-col>
                      <v-text-field
                        type="number"
                        :error-messages="errors.size"
                        v-model.number="item.size"
                        name="size"
                        label="Size"
                    /></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4"
                      ><v-text-field
                        :error-messages="errors.street"
                        prepend-inner-icon="signpost"
                        v-model.trim="item.street"
                        name="street"
                        label="Street"
                    /></v-col>
                    <v-col cols="12" md="4"
                      ><v-text-field
                        :error-messages="errors.zipcode"
                        prepend-inner-icon="contact_mail"
                        v-model.trim="item.zipcode"
                        name="zipcode"
                        label="Zipcode"
                    /></v-col>
                    <v-col cols="12" md="4"
                      ><v-text-field
                        :error-messages="errors.city"
                        prepend-inner-icon="location_city"
                        v-model.trim="item.city"
                        name="city"
                        label="City"
                    /></v-col>
                  </v-row>
                  <v-textarea
                    :error-messages="errors.description"
                    v-model.trim="item.description"
                    label="Description"
                    name="description"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-switch color="primary" v-model="item.parking" label="Parking" name="parking" />
                  <v-switch
                    color="primary"
                    v-model="item.internet"
                    label="Internet access"
                    name="internet"
                  />
                  <v-switch
                    color="primary"
                    v-model="item.dissability"
                    label="Accessibility for disabled people"
                    name="dissability"
                  />
                  <v-switch
                    color="primary"
                    v-model="item.pets"
                    label="Pet friendly policy"
                    name="pets"
                  />
                  <v-switch
                    color="primary"
                    v-model="item.public"
                    label="Available for rent"
                    name="public"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-right">
                  <ResponsiveBtn color="primary" icon="save" text="save" type="submit" />
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item value="two">
              <v-row>
                <v-col cols="4" v-for="image in item.images" :key="image.id">
                  <ImageForm :image="image" @delete="deleteImage" />
                </v-col>
                <v-col cols="4">
                  <ImageForm :id="item.id" @create="addImage" />
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item value="three">
              <v-row>
                <v-col cols="4" v-for="stall in item.stalls" :key="stall.id">
                  <StallForm :stall="stall" @delete="deleteStall" />
                </v-col>
                <v-col cols="4">
                  <StallForm :id="item.id" @create="addStall" />
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
