<script setup lang="ts">
import EventCard from './EventCard.vue'
import Carousel from 'primevue/carousel'
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTopEvents } from '../../controllers/Events'
import type { Event } from '@/models/Event';

const { t } = useI18n()
const events = ref<Event[]>([]);

onMounted(() => {
  getTopEvents().then((response) => {
    events.value = response
    console.log(response)
  }).catch((error) => {
    console.error('Error fetching events:', error)
  })
})

const isMobile = ref(false)

// Détecte si l'appareil est mobile au chargement et lors du redimensionnement
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// Exécute la vérification au montage du composant
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

// Nettoie l'event listener lors du démontage
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div class="p-4 pt-10 max-w-7xl mx-auto">
    <p class="text-4xl font-bold mb-4">{{ t('homepage.popularEvents.title') }}</p>
    <p class="mb-4">{{ t('homepage.popularEvents.description') }}</p>
  </div>

  <div class="border-b-2 border-gray-200 mb-4"></div>

  <div v-if="!isMobile" class="prime-carrousel p-4 mx-auto">
    <Carousel :value="events" :numVisible="4" :numScroll="4" circular>
      <template #item="event">
        <div class="flex justify-center">
          <EventCard :event="event.data" />
        </div>
      </template>
    </Carousel>
  </div>

  <div v-else class="mobile-events-container">
    <div class="mobile-events-scroll">
      <div v-for="event in events" :key="event.id" class="mobile-event-item">
        <EventCard :event="event" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.prime-carrousel {
  width: 90vw;
}

.mobile-events-container {
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
}

.mobile-events-scroll {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 0.5rem 0;
  scrollbar-width: none;
}

.mobile-events-scroll::-webkit-scrollbar {
  display: none;
}

.mobile-event-item {
  flex: 0 0 auto;
  max-width: 70%;
}
</style>
