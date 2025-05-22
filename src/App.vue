<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheFooter from './components/footer/TheFooter.vue'
import NavBar from './components/navbar/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>

  <div class="content">
    <RouterView />
  </div>

  <footer>
    <TheFooter />
  </footer>
</template>

<style scoped>
header {
  width: 100vw;
}

div.content {
  flex-grow: 1 !important;
  padding-top: 80px;
}

@media (max-width: 768px) {
  div.content {
    padding-top: 0;
  }
}
</style>
