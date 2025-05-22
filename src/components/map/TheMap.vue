<template>
  <div class="p-4 pt-10 max-w-7xl mx-auto">
    <p class="text-4xl font-bold mb-4">{{ t("homepage.map.title") }}</p>
    <p class="mb-4">{{ t("homepage.map.description") }}</p>
  </div>

  <div class="border-b-2 border-gray-200 mb-4"></div>

  <div id="leaflet-map"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useI18n } from 'vue-i18n'

const { t } = useI18n() 

let map = null

onMounted(() => {
  const userLat = sessionStorage.getItem('userLat')
  const userLng = sessionStorage.getItem('userLng')

  const lat = userLat ? parseFloat(userLat) : 48.8566
  const lng = userLng ? parseFloat(userLng) : 2.3522

  map = L.map('leaflet-map').setView([lat, lng], 15)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

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
    .addTo(map)
    .bindPopup('Vous êtes ici')
})

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
  z-index: 1;
}
</style>
