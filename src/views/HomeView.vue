<script setup lang="ts">
import HeroBanner from '@/components/hero/HeroBanner.vue';
import TheWelcome from '../components/TheWelcome.vue'
import PopularEvents from '@/components/events/PopularEvents.vue';
import TheMap from '@/components/map/TheMap.vue';
</script>

<template>
  <main>
    <HeroBanner />
    <PopularEvents />
    <TheMap />
  </main>
</template>
