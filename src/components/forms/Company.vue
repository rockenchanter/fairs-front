<script setup>
import UpdateCreateBtn from '@/components/UpdateCreateBtn.vue'
import ResponsiveBtn from '@/components/ResponsiveBtn.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import { useUtils } from '@/composables/utils.js'
import { reactive, ref } from 'vue'

const props = defineProps({
  company: { type: Object, required: true }
})

const { buildName } = useUtils()
const item = reactive(props.company)
const dialog = ref(false)
const pickedItem = reactive({})
if (!item.addresses) item.addresses = [{ id: 1 }]

const addAddress = () => {
  let nextId = 0
  for (let address of item.addresses) if (address.id > nextId) nextId = address.id
  nextId++
  item.addresses.push({ id: nextId })
}

const openDialog = (address, index) => {
  pickedItem.address = address
  pickedItem.index = index
  dialog.value = true;
}

const deleteAddress = () => {
  item.addresses.splice(pickedItem.index, 1)
  dialog.value = false
}
</script>

<template>
  <v-form>
    <ConfirmationDialog @accept="deleteAddress" @decline="dialog = false" :visible="dialog"/>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4"
          ><v-text-field v-model.trim="item.name" name="name" label="Name"
        /></v-col>
        <v-col cols="12" sm="4"
          ><v-select multiple v-model="item.industries" name="industries" label="Industries"
        /></v-col>
        <v-col cols="12" sm="4"
          ><v-file-input
            v-model="item.logo"
            prepend-icon=""
            prepend-inner-icon="photo_camera"
            accept="image/*"
            name="logo"
            label="Logo"
        /></v-col>
      </v-row>

      <v-row>
        <v-col
          ><v-textarea v-model.trim="item.description" name="description" label="Description"
        /></v-col>
      </v-row>

      <v-row v-for="(address, index) in item.addresses" :key="address.id" align="center">
        <v-col cols="12" sm="3"
          ><v-text-field
            v-model.trim="address.city"
            :name="buildName('address', address.id, 'city')"
            label="City"
        /></v-col>
        <v-col cols="12" sm="4"
          ><v-text-field
            v-model.trim="address.street"
            :name="buildName('address', address.id, 'street')"
            label="Street"
        /></v-col>
        <v-col cols="12" sm="3"
          ><v-text-field
            v-model.trim="address.zipcode"
            :name="buildName('address', address.id, 'zipcode')"
            label="Zipcode"
        /></v-col>
        <v-col cols="12" sm="2"
          ><ResponsiveBtn
            @click="openDialog(address, index)"
            prepend
            color="red"
            icon="delete"
            text="delete"
        /></v-col>
      </v-row>

      <v-row>
        <v-col class="text-right">
          <ResponsiveBtn @click="addAddress" prepend color="green" text="add another" icon="add"
        /></v-col>
      </v-row>

      <v-row>
        <v-col class="text-right"> <UpdateCreateBtn :new_rec="!item.id" /></v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
