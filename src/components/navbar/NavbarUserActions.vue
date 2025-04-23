<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { Button } from 'primevue'

const menu = useTemplateRef('menu')
const items = ref([
  {
    items: [
      {
        label: 'Login',
        icon: 'pi pi-user',
      },
      {
        label: 'Register',
        icon: 'pi pi-user',
      },
    ],
  },
])
function toggle(event: Event) {
  menu.value?.toggle(event)
}
</script>

<template>
  <div class="navbar-user-actions">
    <Button icon="pi pi-flag" variant="outlined" />
    <Button icon="pi pi-heart" variant="outlined" />
    <Button icon="pi pi-user" variant="outlined" @click="toggle" />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>

<style scoped>
.navbar-user-actions {
  display: flex;
}
button {
  margin: 0 2%;
}

.navbar-user-actions button:hover {
  border-color: var(--p-button-primary-hover-background);
}
</style>

<style>
#overlay_menu {
  --p-menu-submenu-label-padding: 0;
}
</style>
