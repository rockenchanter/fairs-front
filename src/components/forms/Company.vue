<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ResponsiveBtn from '@/components/ResponsiveBtn.vue'
import AddressForm from '@/components/forms/Address.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import { useDataStore } from '@/stores/data.js'
import { useApi } from '@/composables/api.js'
import { useUtils } from '@/composables/utils.js'
import { onMounted } from 'vue'

const props = defineProps({
  id: { type: Number, required: false }
})

const item = ref({})
const address = ref({})
const errors = ref({})
const addr_errors = ref({})
const confDialog = ref(false)
const tab = ref('one')

const emit = defineEmits(['close', 'update'])
const api = useApi()
const utils = useUtils()
const rtr = useRouter()
const ds = useDataStore()

const fetchCompany = async () => {
  const data = await api.getCompany(props.id)
  item.value = data.company
}
const sendForm = async (event) => {
  const fd = new FormData(event.target)
  api.initErrors(['name', 'industries', 'image', 'description'], errors)
  api.initErrors(['city', 'street', 'zipcode'], addr_errors)
  if (item.value.id) {
    const data = await api.updateCompany(item.value.id, fd)
    if (data.errors) {
      errors.value = data.errors.company
      addr_errors.value = data.errors.address
    } else emit('update', data.company)
  } else {
    const data = await api.createCompany(fd)
    if (data.errors) {
      errors.value = data.errors.company
      addr_errors.value = data.errors.address
    } else emit('close', data.company)
  }
}

const deleteCompany = () => {
  confDialog.value = false
  ds.setUserCompany(null)
  api.deleteCompany(item.value.id)
  rtr.push({ name: 'companies-index' })
}
const deleteAddress = (id) => {
  utils.deleteFromArray(id, item.value.addresses)
}

const addAddress = (addr) => {
  item.value.addresses.push(addr)
}

onMounted(() => {
  if (props.id) fetchCompany()
})
</script>

<template>
  <v-card>
    <v-container>
      <v-card-title>
        <v-tabs v-model="tab">
          <v-tab value="one">General</v-tab>
          <v-tab v-if="item.id" value="two">Addresses</v-tab>
        </v-tabs>
      </v-card-title>

      <v-card-text class="py-4">
        <v-form @submit.prevent="sendForm">
          <input type="hidden" name="exhibitor_id" :value="ds.user ? ds.user.id : 0" />
          <v-window v-model="tab">
            <v-window-item value="one">
              <v-row>
                <v-col cols="12" sm="4"
                  ><v-text-field
                    :error-messages="errors.name"
                    v-model.trim="item.name"
                    name="name"
                    label="Name"
                /></v-col>
                <v-col cols="12" sm="4"
                  ><v-select
                    :error-messages="errors.industries"
                    v-model="item.industries"
                    name="industry"
                    :items="ds.industries"
                    multiple
                    item-title="name"
                    item-value="id"
                    label="Industries"
                  >
                    <template v-slot:selection="{ item }">
                      <v-icon :icon="item.raw.icon" :color="item.raw.color" />
                    </template>
                    <template v-slot:item="{ props, item }">
                      <v-list-item v-bind="props">
                        <template v-slot:prepend>
                          <v-icon :icon="item.raw.icon" :color="item.raw.color" />
                        </template>
                      </v-list-item>
                    </template>
                  </v-select>
                </v-col>
                <v-col v-if="!item.id" cols="12" sm="4"
                  ><v-file-input
                    :error-messages="errors.image"
                    v-model="item.image"
                    prepend-icon=""
                    prepend-inner-icon="photo_camera"
                    accept="image/*"
                    name="image"
                    label="Logo"
                /></v-col>
              </v-row>

              <v-row v-if="!item.id">
                <v-col>
                  <v-text-field
                    v-model.trim="address.street"
                    :error-messages="addr_errors.street"
                    label="Street"
                    name="street"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model.trim="address.zipcode"
                    :error-messages="addr_errors.zipcode"
                    label="Zipcode"
                    name="zipcode"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model.trim="address.city"
                    :error-messages="addr_errors.city"
                    label="City"
                    name="city"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  ><v-textarea
                    :error-messages="errors.description"
                    v-model.trim="item.description"
                    name="description"
                    label="Description"
                /></v-col>
              </v-row>

              <v-row class="pb-2">
                <v-col class="text-right">
                  <ResponsiveBtn icon="save" color="primary" type="submit" text="save" />
                  <ResponsiveBtn
                    class="ms-2"
                    v-if="item.id"
                    icon="delete"
                    color="red"
                    text="delete"
                    @click="confDialog = true"
                  />
                  <ConfirmationDialog
                    :visible="confDialog"
                    @accept="deleteCompany"
                    @decline="confDialog = false"
                  />
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item value="two">
              <v-row>
                <v-col cols="4" v-for="address in item.addresses" :key="address.id">
                  <AddressForm
                    :address="address"
                    @delete="deleteAddress"
                    :disable-delete="item.addresses.length == 1"
                  />
                </v-col>
                <v-col cols="4">
                  <AddressForm @create="addAddress" />
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-form>
      </v-card-text>
    </v-container>
  </v-card>
</template>
