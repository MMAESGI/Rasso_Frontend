<script setup lang="ts">
import EventCard from './EventCard.vue';

</script>

<template>
    <div class="popular">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
    </div>
</template>

<style lang="css" scoped>
    .popular {
        display: flex;
        padding: 0 10%;
        width: auto;
        justify-content: space-evenly;
        align-items: center;
        margin-top : 1%
    }

    .popular > * {
        flex-grow: 0;
        flex-shrink: 0;
    }
</style>