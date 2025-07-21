<script setup lang="ts">
import EventCard from './EventCard.vue'
import Carousel from 'primevue/carousel'
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTopEvents } from '../../controllers/Events'
import type { Event } from '@/models/Event';

const { t } = useI18n()
const events = ref<Event[]>([]);
const isLoading = ref(true);

onMounted(() => {
  getTopEvents().then((response) => {
    events.value = response
  }).catch((error) => {
    console.error('Error fetching events:', error)
  }).finally(() => {
    isLoading.value = false
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
  <div v-if="isLoading" class="flex justify-center items-center py-20">
    <div class="text-center">
      <i class="pi pi-spin pi-spinner text-4xl text-blue-500 mb-4"></i>
      <p class="text-lg text-gray-600">Chargement des événements populaires...</p>
    </div>
  </div>
  
  <div v-else>
    <div class="p-4 pt-10 max-w-7xl mx-auto">
      <p class="text-4xl font-bold mb-4">{{ t('homepage.popularEvents.title') }}</p>
      <p class="mb-4">{{ t('homepage.popularEvents.description') }}</p>
    </div>

    <div class="border-b-2 border-gray-200 mb-4"></div>

    <div v-if="!isMobile" class="prime-carrousel p-4 mx-auto">
      <Carousel v-if="events.length > 1" :value="events" :numVisible="3" :numScroll="3" circular>
        <template #item="event">
          <div class="carousel-item-wrapper">
            <EventCard :event="event.data" />
          </div>
        </template>
      </Carousel>
      
      <!-- Affichage spécial pour un seul événement -->
      <div v-else-if="events.length === 1" class="single-event-container">
        <div class="single-event-wrapper">
          <EventCard :event="events[0]" />
        </div>
      </div>
    </div>

    <div v-else class="mobile-events-container">
      <div class="mobile-events-scroll">
        <div v-for="event in events" :key="event.id" class="mobile-event-item">
          <EventCard :event="event" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prime-carrousel {
  max-width: 1200px;
  width: 100%;
}

.carousel-item-wrapper {
  display: flex;
  justify-content: center;
  padding: 0 0.5rem;
  width: 90%;
  height: 400px;
}

.carousel-item-wrapper :deep(.event-card) {
  width: 260px !important;
  max-width: 260px !important;
  height: 380px !important;
}

.carousel-item-wrapper :deep(.card-image) {
  height: 300px !important;
  width: 300px !important;
}

.single-event-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.single-event-wrapper {
  max-width: 300px;
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
  width: 250px;
}

.mobile-event-item:last-child {
  margin-right: 0;
}
</style>
