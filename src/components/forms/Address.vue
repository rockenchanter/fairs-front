<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/api.js'
import { useDataStore } from '@/stores/data.js'

const props = defineProps({
    address: { type: Object, required: false },
    disableDelete: { type: Boolean },
    company_id: { type: Number },
})

const api = useApi()
const item = ref(props.address || {})
const errors = ref({})
const ds = useDataStore()
const emit = defineEmits(['create', 'delete'])

const sendForm = async (event) => {
    const fd = new FormData(event.target)
    api.initErrors(['city', 'street', 'zipcode'], errors)
    if (item.value.id) {
        const data = await api.updateAddress(item.value.id, fd)
        if (data.errors) {
            errors.value = data.errors
        } else {
            ds.showAlert('success', 'Address has been updated')
            errors.value = {}
        }
    } else {
        const data = await api.createAddress(fd)
        if (data.errors) {
            errors.value = data.errors
        } else {
            errors.value = {}
            event.target.reset()
            emit('create', data)
        }
    }
}
const deleteAddress = () => {
    api.deleteAddress(item.value.id)
    emit('delete', item.value.id)
}
</script>

<template>
    <v-form @submit.prevent="sendForm">
        <input type="hidden" v-if="company_id" :value="company_id" name="company_id" />
        <v-row>
            <v-col>
                <v-text-field v-model.trim="item.street" name="street" label="Street" :error-messages="errors.street" />
                <v-text-field v-model.trim="item.zipcode" name="zipcode" label="Zipcode" :error-messages="errors.zipcode" />
                <v-text-field v-model.trim="item.city" name="city" label="City" :error-messages="errors.city" />
                <v-btn-group>
                    <v-btn :icon="item.id ? 'update' : 'save'" :color="item.id ? 'green' : 'primary'" type="submit" />
                    <v-btn v-if="item.id && !disableDelete" icon="delete" color="red" @click="deleteAddress()" />
                </v-btn-group>
            </v-col>
        </v-row>
    </v-form>
</template>
