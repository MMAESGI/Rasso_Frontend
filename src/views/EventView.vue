<script setup lang="ts">
import EventImages from '@/components/events/EventImages.vue'
import SmallMap from '@/components/map/SmallMap.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getEventById } from '@/controllers/Events'
import type { Event } from '@/models/Event'

const eventInfo = ref<Event | null>(null)
const locations = ref<{ lat: number; lng: number; name: string }>({
  lat: 48.8566, // Default latitude (Paris)
  lng: 2.3522, // Default longitude (Paris)
  name: 'Paris, France', // Default location name
})

onMounted(() => {
  const route = useRoute()
  const eventId = route.params.id
  getEventById(eventId.toString()).then((event) => {
    eventInfo.value = event.data;
    if (eventInfo.value) {
      locations.value = {
        lat: eventInfo.value.latitude ?? 48.8566,
        lng: eventInfo.value.longitude ?? 2.3522,
        name: eventInfo.value.location ?? 'Paris, France',
      }
    }

    console.log('locations Info:', locations.value)
  }).catch((error) => {
    console.error('Error fetching event:', error)
  })
});

function formatDate(date: string | Date | undefined) {
  if (!date) return ''
  return new Date(date).toLocaleString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  })
}

// Helper for images fallback
function getImages(): string[] {
  // On tente d'utiliser une propriété imageUrl si elle existe, sinon fallback
  return eventInfo.value?.imageUrls || [
    'https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Japan.jpg',
    'https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Japan.jpg',
    'https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Japan.jpg',
    'https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Japan.jpg',
    'https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Japan.jpg',
  ]
}
</script>

<template>
  <div class="md:px-80 px-5 py-10">
    <EventImages :images="getImages()" class="mb-10" />
    <div class="flex w-full flex-col md:flex-row">
      <div class="md:w-2/3 md:pr-10">
        <div class="flex justify-between items-center w-full">
          <span class="text-2xl font-bold">{{ eventInfo?.title }}</span>
          <div class="rounded-full pill-shadow flex items-center justify-center px-2.5 py-2">
            <i class="pi pi-heart mr-2"></i>
            <i class="pi pi-upload"></i>
          </div>
        </div>
        <hr class="my-8" />
        <div class="" style="white-space: pre-wrap">{{ eventInfo?.description }}</div>
      </div>
      <div class="md:w-1/3 mt-10 md:mt-0 flex flex-col">
        <div class="flex flex-row items-center font-semibold">
          <i class="pi pi-calendar text-2xl! mr-2"></i>
          <span>{{ formatDate(eventInfo?.date) }}</span>
        </div>
        <div class="flex flex-row items-center font-semibold mb-2">
          <i class="pi pi-map-marker text-2xl! mr-2"></i>
          <span>{{ locations.name }}</span>
        </div>
        <SmallMap :markers="[locations]" height="600px" />
      </div>
    </div>
  </div>
</template>

<style>
.pill-shadow {
  box-shadow: 1px 2px 7px 1px rgba(0, 0, 0, 0.24);
}
</style>
