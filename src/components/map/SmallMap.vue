<template>
  <div class="relative">
    <div v-if="isLoading" class="absolute inset-0 flex justify-center items-center bg-gray-100 rounded-lg z-10">
      <div class="text-center">
        <i class="pi pi-spin pi-spinner text-2xl text-blue-500 mb-2"></i>
        <p class="text-sm text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
    <div id="small-leaflet-map" :style="'height:' + (props.height ?? '500px')" class="small-map"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  markers?: {
    lat: number
    lng: number
    name: string
  }[]
  height: string
}>()

const isLoading = ref(true)

let map: L.Map | null = null

onMounted(() => {
  initializeMap()
})

watch(() => props.markers, () => {
  if (map) {
    // Supprime les anciens markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map!.removeLayer(layer)
      }
    })
    
    // Réinitialise la vue de la map
    if (props.markers && props.markers.length > 0) {
      const marker = props.markers[0]
      map.setView([marker.lat, marker.lng], 15)
      
      // Ajoute les nouveaux markers
      props.markers.forEach((marker) => {
        L.marker([marker.lat, marker.lng], {
          title: marker.name,
          alt: marker.name,
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
          .bindPopup(marker.name)
      })
    }
  }
}, { deep: true })

function initializeMap() {
  let deflat = 48.8566
  let deflng = 2.3522
  if (props.markers != undefined && props.markers.length > 0) {
    ;[deflat, deflng] = [props.markers[0].lat, props.markers[0].lng]
  }
  
  map = L.map('small-leaflet-map').setView([deflat, deflng], 15)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  if (props.markers != undefined) {
    props.markers.forEach((marker) => {
      L.marker([marker.lat, marker.lng], {
        title: marker.name,
        alt: marker.name,
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
        .bindPopup(marker.name)
    })
  }

  // Cache le loading après initialisation
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
.small-map {
  z-index: 100;
}
</style>
