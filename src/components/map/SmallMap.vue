<template>
  <div id="small-leaflet-map" :style="'height:' + (props.height ?? '500px')"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  markers?: {
    lat: number,
    lng: number,
    name: string
  }[], 
  height: string
}>();

let map: L.Map | null = null

onMounted(() => {

  let deflat = 48.8566
  let deflng = 2.3522
  if (props.markers != undefined && props.markers.length > 0) {
    [deflat, deflng] = [props.markers[0].lat, props.markers[0].lng]
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


})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>