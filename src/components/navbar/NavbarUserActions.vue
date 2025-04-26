<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

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
    <span><i class="pi pi-globe"></i></span>
    <span><i class="pi pi-heart"></i></span>
    <span @click="toggle"><i class="pi pi-user"></i></span>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>

<style scoped>
.navbar-user-actions {
  display: flex;
  align-items: center;
}

.navbar-user-actions button:hover {
  border-color: var(--p-button-primary-hover-background);
}

i {
  font-size: 1.25rem;
  padding: 9px 12px
}

span:not(:last-child) {
  border-image: linear-gradient(180deg,rgba(255, 255, 255, 1) 0%, rgb(175, 175, 175) 50%, rgba(255, 255, 255, 1) 100%) 1 100%;
  border-width: 2px;
  border-style: solid;
  border-left: 0;
  border-top: 0;
  border-bottom: 0;
}
</style>

<style>
#overlay_menu {
  --p-menu-submenu-label-padding: 0;
}
</style>
