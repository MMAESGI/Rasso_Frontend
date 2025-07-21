<template>
  <div class="p-4 pt-10 max-w-7xl mx-auto">
    <p class="text-4xl font-bold mb-4">{{ t('homepage.map.title') }}</p>
    <p class="mb-4">{{ t('homepage.map.description') }}</p>
    <p v-if="events.length > 0" class="text-sm text-gray-600 mb-2">
      {{ events.length }} événement(s) trouvé(s) près de vous
    </p>
  </div>

  <div class="border-b-2 border-gray-200 mb-4"></div>

  <div id="leaflet-map"></div>

  <div v-if="isLoading" class="loader-overlay">
    <i class="pi pi-spin pi-spinner text-4xl text-blue-500 mb-4"></i>
    <p class="text-lg text-gray-600">Chargement de la carte et des événements...</p>
  </div>
</template>


<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useI18n } from 'vue-i18n'
import { getEventsByLocation } from '@/controllers/Events'
import type { Event } from '@/models/Event'

const { t } = useI18n()

let map: L.Map | null = null
const events = ref<Event[]>([])
const isLoading = ref(true)

onMounted(() => {
  // Attendre que le DOM soit complètement rendu
  setTimeout(() => {
    const userLat = sessionStorage.getItem('userLat')
    const userLng = sessionStorage.getItem('userLng')

    const lat = userLat ? parseFloat(userLat) : 48.8566
    const lng = userLng ? parseFloat(userLng) : 2.3522

    initializeMap(lat, lng)
    loadEventsForLocation(lat, lng)
  }, 200) // Augmente le délai pour s'assurer que le DOM est prêt
})

async function loadEventsForLocation(lat: number, lng: number) {
  try {
    console.log(`Loading events for location: ${lat}, ${lng}`)
    events.value = await getEventsByLocation(lat, lng)
    displayEventsOnMap()
  } catch (error) {
    console.error('Error loading events for location:', error)
  } finally {
    isLoading.value = false
  }
}

function initializeMap(lat: number, lng: number) {
  const mapContainer = document.getElementById('leaflet-map')
  if (!mapContainer) {
    console.error('Map container not found')
    isLoading.value = false
    return
  }

  map = L.map('leaflet-map').setView([lat, lng], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  // Marqueur de position utilisateur
  L.marker([lat, lng], {
    title: 'Votre position',
    alt: 'Votre position',
    icon: L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      shadowSize: [41, 41],
    }),
  })
    .addTo(map!)
    .bindPopup('Vous êtes ici')
}

function displayEventsOnMap() {
  if (!map || !events.value.length) return

  // Icône différente pour les événements
  const eventIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    className: 'event-marker'
  })

  events.value.forEach(event => {
    if (event.latitude && event.longitude) {
      const marker = L.marker([event.latitude, event.longitude], {
        title: event.title || 'Événement',
        alt: event.title || 'Événement',
        icon: eventIcon
      }).addTo(map!)

      // Popup avec informations de l'événement
      const popupContent = `
        <div class="event-popup">
          <h3 class="font-bold text-lg mb-2">${event.title || 'Événement sans titre'}</h3>
          <p class="text-sm mb-2">${event.description || 'Aucune description'}</p>
          <p class="text-xs text-gray-600 mb-2">📍 ${event.location || 'Lieu non précisé'}</p>
          ${event.date ? `<p class="text-xs text-gray-600 mb-2">📅 ${new Date(event.date).toLocaleDateString('fr-FR')}</p>` : ''}
          ${event.category ? `<p class="text-xs text-blue-600">#${event.category}</p>` : ''}
          <a href="/event/${event.id}" class="text-blue-500 text-sm hover:underline">Voir plus</a>
        </div>
      `
      marker.bindPopup(popupContent)
    }
  })
}

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style lang="css" scoped>
#leaflet-map {
  padding: 0 10%;
  margin: 0 auto;
  width: 80%;
  height: 80vh;
  border-radius: 12px;
  z-index: 100;
}

:deep(.event-marker) {
  filter: hue-rotate(120deg);
}

:deep(.event-popup) {
  min-width: 200px;
}

:deep(.event-popup h3) {
  margin: 0 0 8px 0;
}

:deep(.event-popup p) {
  margin: 0 0 4px 0;
}
</style>
