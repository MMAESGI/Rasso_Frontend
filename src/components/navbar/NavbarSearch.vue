<script setup lang="ts">
import InputText from 'primevue/inputtext'
</script>

<template>
  <div class="navbar-search">
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
.navbar-search {
  min-width: 25vw;
  
  input {
    border-radius: 20px;
  }
}
</style>
