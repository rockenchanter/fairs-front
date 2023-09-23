<script setup>
import { reactive, ref } from 'vue'
import ResponsiveBtn from '../ResponsiveBtn.vue'
import UpdateCreateBtn from '@/components/UpdateCreateBtn.vue'

import { useUtils } from '@/composables/utils.js'

const props = defineProps({
  hall: { type: Object, required: true }
})

const item = reactive(props.hall)
const { buildName } = useUtils()
const tab = ref('two')
const deleteDialogs = reactive(new Array(item.images.length).fill(false))
const snackbar = ref(false)

const new_images = reactive([])
const new_stalls = reactive([])

const addImage = () => new_images.push({ id: new_images.length + 1, path: null, description: '' })
const addStall = () => new_stalls.push({ id: new_stalls.length + 1 })

const updateImage = (image) => {
  snackbar.value = true
}

const deleteImage = (index, image) => {
  item.images.splice(index, 1)
  closeDialog(index)
}

const closeDialog = (idx) => (deleteDialogs[idx] = false)

const sendForm = (event) => {
  const fd = new FormData(event.target)
  console.log(fd)
}

if (!item.images.length) for (let i = 1; i <= 3; i++) addImage()
else addImage()

if (!item.address) item.address = {}

if (!item.stalls.length) for (let i = 1; i <= 3; i++) addStall()
else addStall()
</script>

<template>
  <v-form @submit.prevent="sendForm">
    <v-container>
      <v-row>
        <v-col>
          <v-tabs class="mb-4" color="primary" v-model="tab" show-arrows>
            <v-tab value="one" prepend-icon="info" text="General" />
            <v-tab value="two" prepend-icon="collections" text="Images" />
            <v-tab value="three" prepend-icon="storefront" text="Stalls" />
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="one">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model.trim="item.name" name="name" label="Name" />
                  <v-text-field
                    type="number"
                    v-model.number="item.price"
                    name="price"
                    label="Price"
                  />
                  <v-row>
                    <v-col cols="12" md="4"
                      ><v-text-field
                        prepend-inner-icon="signpost"
                        v-model.trim="item.address.street"
                        name="address_street"
                        label="Street"
                    /></v-col>
                    <v-col cols="12" md="4"
                      ><v-text-field
                        prepend-inner-icon="contact_mail"
                        v-model.trim="item.address.street"
                        name="address_zipcode"
                        label="Zipcode"
                    /></v-col>
                    <v-col cols="12" md="4"
                      ><v-text-field
                        prepend-inner-icon="location_city"
                        v-model.trim="item.address.street"
                        name="address_city"
                        label="City"
                    /></v-col>
                  </v-row>
                  <v-textarea
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
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item value="two">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                  v-for="(image, index) in item.images"
                  :key="image.id"
                >
                  <v-card density="compact">
                    <v-img :src="image.path" />
                    <v-card-text
                      ><v-text-field label="Description" v-model.trim="image.description"
                    /></v-card-text>
                    <v-card-actions>
                      <ResponsiveBtn
                        color="green"
                        text="update"
                        icon="update"
                        @click="updateImage(image)"
                      />
                      <v-spacer />
                      <v-dialog width="auto" v-model="deleteDialogs[index]">
                        <template v-slot:activator="{ props }">
                          <ResponsiveBtn
                            v-bind="props"
                            color="red"
                            text="delete"
                            icon="delete"
                            prepend
                          />
                        </template>

                        <v-container>
                          <v-card>
                            <v-card-item>
                              <v-card-title>Are you sure?</v-card-title>
                              <v-card-subtitle>This action can not be reversed</v-card-subtitle>
                            </v-card-item>

                            <v-card-actions>
                              <v-spacer />
                              <v-btn color="red" text="yes" @click="deleteImage(index, image)" />
                              <v-btn text="no" @click="closeDialog(index)" />
                            </v-card-actions>
                          </v-card>
                        </v-container>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <span class="text-subtitle-2 font-weight-light"
                    >Empty fields will be ignored</span
                  >
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-row v-for="image in new_images" :key="image.id">
                    <v-col cols="12" md="4"
                      ><v-file-input
                        label="Image"
                        prepend-icon=""
                        prepend-inner-icon="photo_camera"
                        v-model="image.file"
                        :name="buildName('image', image.id, 'file')"
                    /></v-col>
                    <v-col cols="12" md="8"
                      ><v-text-field
                        label="Description"
                        v-model="image.description"
                        :name="buildName('image', image.id, 'description')"
                    /></v-col>
                  </v-row>

                  <v-row>
                    <v-col class="text-right">
                      <ResponsiveBtn @click="addImage" icon="add" text="add another" color="green"
                    /></v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item value="three">
              <v-row v-for="stall in new_stalls">
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.number="stall.size"
                    label="Size"
                    :name="buildName('stall', stall.id, 'size')"
                  />
                  <v-text-field
                    v-model.number="stall.max_amount"
                    label="Amount"
                    :name="buildName('stall', stall.id, 'max_amount')"
                  />
                  <v-file-input
                    accept="image/*"
                    prepend-icon=""
                    prepend-inner-icon="photo_camera"
                    v-model="stall.image"
                    label="Image"
                    :name="buildName('stall', stall.id, 'image')"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-switch
                    color="primary"
                    v-model="stall.electricity"
                    label="Electricity"
                    :name="buildName('stall', stall.id, 'parking')"
                  />
                  <v-switch
                    color="primary"
                    v-model="stall.internet"
                    label="Network"
                    :name="buildName('stall', stall.id, 'network')"
                  />
                  <v-switch
                    color="primary"
                    v-model="stall.support"
                    label="Support"
                    :name="buildName('stall', stall.id, 'support')"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col class="text-right">
                  <UpdateCreateBtn type="submit" :new_rec="!item.id" />
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
