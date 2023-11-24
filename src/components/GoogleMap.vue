<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  addresses: { type: Array, required: false },
  address: { type: Object, required: false }
})

const address = ref(props.address)
const addresses = ref(props.addresses)

const findAddress = (addressID) => {
  let address = null
  for (let addr of props.addresses) {
    if (addr.id == addressID) {
      address = addr
      break
    }
  }
  return address
}
const buildUrl = (address) => {
  if (address == null) return
  const url = new URL('https://www.google.com/maps/embed/v1/place')
  url.searchParams.set('q', `${address.city}, ${address.street}`)
  url.searchParams.set('key', APIKEY)
  const iframe = document.querySelector('#googleFrame')
  iframe.src = url.toString()
}

const selected = ref(null)
const APIKEY = 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'

onMounted(() => {
  if (address.value) buildUrl(address.value)
  else if (addresses.length) {
    buildUrl(addresses[0])
    selected.value = addresses[0].id
  }
})

watch(selected, (neww, old) => {
  if (neww != old) buildUrl(findAddress(neww))
})
</script>

<template>
  <v-row>
    <v-col md="8">
      <v-select
        v-if="!address"
        :items="addresses"
        item-value="id"
        item-title="street"
        v-model="selected"
        placeholder="Select address"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props">
            <v-list-item-subtitle>{{ item.raw.city }}, {{ item.raw.zipcode }}</v-list-item-subtitle>
          </v-list-item>
        </template>
      </v-select>
      <iframe
        id="googleFrame"
        width="100%"
        height="400px"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </v-col>
  </v-row>
</template>
