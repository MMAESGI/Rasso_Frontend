<script setup lang="ts">
import InputText from 'primevue/inputtext'
</script>

<template>
  <div class="min-w-[40vw]">
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        :fluid="true"
        class="searchbar"
        type="text"
        placeholder="Qu'est-ce que tu aimerais faire ?"
      />
    </IconField>
  </div>
</template>

<style scoped>
.searchbar {
  border-radius: 100px;
  width: 100%;
  padding: 0.75rem 1rem;
}
</style>