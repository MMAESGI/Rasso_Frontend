<script setup lang="ts">

const props = defineProps<{
    images: string[]
}>();
</script>

<template>
    <div v-if="props.images.length != 0">
        <div v-if="props.images.length == 1">
            <img class="w-full h-[380px]" :src="props.images[0]">
        </div> 
        <div v-else class="grid grid-cols-2 md:gap-4 gap-2">
            <img class="w-full h-[380px]" :src="props.images[0]">
            <div v-if="props.images.length == 2">
                <img class="w-full h-[380px]" :src="props.images[1]">
            </div>
            <div v-else  :class="'h-[380px] w-full grid grid-rows-2 md:gap-4 gap-2 ' + (props.images.length > 3 ? 'md:grid-cols-2' : '')">
                <img :src="image" v-for="(image, index) in props.images.slice(1, Math.min(props.images.length, 5))" v-bind:key="index" :class="'w-full h-full ' + (index >= 2 ? 'hidden md:block' : '')" >
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
img {
    object-fit: cover;
}
</style>