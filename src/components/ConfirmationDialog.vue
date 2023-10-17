<script setup>
    defineProps({
        visible: { type: Boolean, required: false }
    })
    const emit = defineEmits(["accept", "decline"]);
</script>

<template>
    <v-dialog width="auto" :model-value="visible">
        <v-card>
            <v-card-item>
                <v-card-title>Are you sure?</v-card-title>
            </v-card-item>
            <v-card-text>This action can not be undone</v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="emit('accept')" color="red" text="yes" />
                <v-btn @click="emit('decline')" text="no" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
