<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import NavbarActions from './NavbarActions.vue'
import NavbarLogo from './NavbarLogo.vue'
import NavbarSearch from './NavbarSearch.vue'
import NavbarUserActions from './NavbarUserActions.vue'

const menu = useTemplateRef('menu')
const items = ref([
  {
    separator: true
  },
  {
    items: [
      {
        label: "Carte",
        icon: "pi pi-map"
      },
    ]
  },
  {
    items: [
      {
        label: 'Évènements',
        icon: 'pi pi-globe',
      },
      {
        label: 'Favoris',
        icon: 'pi pi-heart',
      },
    ],
  },
  {
    items: [
      {
        label: 'Login',
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
  <nav class="bg-white shadow-md w-full">
    <div class="mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex items-center md:hidden">
          <button @click="toggle" class="text-gray-700 hover:text-gray-900 focus:outline-none">
            <i class="pi pi-bars text-2xl"></i>
          </button>
        </div>
        
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="md:hidden">
          <template #start>
            <div class="py-2">
              <NavbarLogo />
            </div>
          </template>
        </Menu>
        
        <div class="hidden md:flex md:items-center px-3">
          <NavbarLogo />
        </div>
        
        <div class="flex-1 flex items-center justify-center gap-2">
          <div class="hidden md:flex md:items-center">
            <NavbarActions />
          </div>
          <NavbarSearch />
        </div>
        
        <div class="hidden md:flex md:items-center">
          <NavbarUserActions />
        </div>
      </div>
    </div>
  </nav>
</template>
