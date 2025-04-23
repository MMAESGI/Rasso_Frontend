<script setup lang="ts">
import { Button, ButtonGroup } from 'primevue'
</script>

<template>
  <div class="navbar-actions">
    <span class="location-changer"><i class="pi pi-map-marker"></i> Paris</span>
    <ButtonGroup>
      <Button label="Catégories" icon="pi pi-book" variant="outlined" />
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

.location-changer {
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
