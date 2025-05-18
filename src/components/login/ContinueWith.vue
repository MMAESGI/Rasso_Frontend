<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{
    service?: "facebook" | "google" | "apple"
}>()
function getServiceName(){
    return props.service == "facebook" ? "Facebook" : (props.service == "apple" ? "Apple ID" : "Google")
}
</script>

<template>
    <div class="flex rounded-full items-center justify-center px-[15px] py-[8px] shadow-md">
        <i v-bind:class="'pi pi-' + props.service + ' mr-auto'"></i>
        <span class="font-semibold mr-auto">Continuer avec {{ getServiceName() }}</span>
    </div>
</template>

<style scoped></style>
