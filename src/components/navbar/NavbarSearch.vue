<script setup lang="ts">
import InputText from 'primevue/inputtext'
</script>

<template>
  <div class="min-w-[40vw]">
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        :fluid="true"
        class="searchbar rounded"
        type="text"
        placeholder="Qu'est-ce que tu aimerais faire ?"
      />
    </IconField>
  </div>
</template>
