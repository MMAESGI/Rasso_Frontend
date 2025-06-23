<script setup lang="ts">
import { reverseGeocode } from '@/services/geolocation';
import { Button, ButtonGroup } from 'primevue'
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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

    // Reload the page to apply the new city on the map
    window.location.reload();
  }
}

function handleLocationError(error: GeolocationPositionError) {
  console.warn("Geolocation error:", error.message);
  city.value = "";
}

function scrollToMap() {
  const map = document.getElementById('leaflet-map');
  if (map) {
    map.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    window.location.href = '/#leaflet-map';
  }
}
</script>

<template>
  <div class="flex items-center">
    <span class="flex items-center mr-5" v-if="city != ''"><i class="pi pi-map-marker"></i> {{ city }}</span>
    <ButtonGroup>
      <Button
        :label="t('homepage.navbar.card')"
        icon="pi pi-map"
        variant="outlined"
        class="hover:border-[var(--p-button-primary-hover-background)] group-[&:not(:last-child)]:border-r-transparent hover:border-r-black"
        @click="scrollToMap"
      />
    </ButtonGroup>
  </div>
</template>
