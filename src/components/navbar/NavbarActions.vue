<script setup lang="ts">
import { reverseGeocode } from '@/services/geolocation';
import { Button, ButtonGroup } from 'primevue'
import { onMounted, ref } from 'vue';

const city = ref("");

onMounted(() => {
  getLocation()
})

function getLocation(){
  navigator.geolocation.getCurrentPosition(getLocationName);
}

async function getLocationName(pos : GeolocationPosition){
  const res = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
  if (res.error != undefined){
    city.value = "";
    return;
  } 
  city.value = res.address.city ?? res.address.town ?? res.address.municipality ?? res.address.country ?? "";
}

</script>

<template>
  <div class="navbar-actions">
    <span class="location-display" v-if="city != ''"><i class="pi pi-map-marker"></i> {{ city }}</span>
    <ButtonGroup>
      <Button label="Carte" icon="pi pi-map" variant="outlined" />
    </ButtonGroup>
  </div>
</template>

<style scoped>
.navbar-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.location-display {
  padding: 0 8% 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    padding-right: 3px;
  }
}

.navbar-actions button:not(:last-child) {
  border-inline-end: 1px solid transparent !important;
}

.navbar-actions button:hover {
  border-color: var(--p-button-primary-hover-background);
  border-inline-end: 1px solid black !important;
}
</style>
