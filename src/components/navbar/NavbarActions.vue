<script setup lang="ts">
import { reverseGeocode } from '@/services/geolocation';
import { Button, ButtonGroup } from 'primevue'
import { onMounted, ref } from 'vue';

const city = ref("");

onMounted(() => {
  const storedCity = sessionStorage.getItem('userCity');
  if (storedCity) {
    city.value = storedCity;
  } else {
    getLocation();
  }
})

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    getLocationName,
    handleLocationError,
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
  );
}

async function getLocationName(pos: GeolocationPosition) {
  console.log("Location found:", pos);
  const res = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
  if (res.error != undefined) {
    city.value = "";
    return;
  }
  
  city.value = res.address.city ?? res.address.town ?? res.address.municipality ?? res.address.country ?? "";
  
  if (city.value) {
    sessionStorage.setItem('userCity', city.value);
    sessionStorage.setItem('userLat', pos.coords.latitude.toString());
    sessionStorage.setItem('userLng', pos.coords.longitude.toString());
  }
}

function handleLocationError(error: GeolocationPositionError) {
  console.warn("Geolocation error:", error.message);
  city.value = "";
}
</script>

<template>
  <div class="flex items-center">
    <span class="flex items-center mr-5" v-if="city != ''"><i class="pi pi-map-marker"></i> {{ city }}</span>
    <ButtonGroup>
      <RouterLink to="/" custom v-slot="{ navigate, href }">
        <Button
          label="Carte"
          icon="pi pi-map"
          variant="outlined"
          class="hover:border-[var(--p-button-primary-hover-background)] group-[&:not(:last-child)]:border-r-transparent hover:border-r-black"
          :href="href"
          @click="navigate"
        />
      </RouterLink>
    </ButtonGroup>
  </div>
</template>
