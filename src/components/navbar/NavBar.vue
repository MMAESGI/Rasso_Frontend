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
  <div class="navbar mx-3 md:mx-64 my-3">
    <div class="block md:hidden" @click="toggle"><i class="pi pi-bars mt-1" style="font-size: 1.5rem;"></i></div>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
      <template #start>
        <span class="inline-flex items-center gap-1 px-2 py-2">
          <NavbarLogo/>
        </span>
      </template>
    </Menu>
    <div class="hidden md:block"><NavbarLogo/></div>
    <div class="hidden md:block"><NavbarActions /></div>
    <div class="grow px-5 md:px-0 md:grow-0"><NavbarSearch /></div>
    <div class="hidden md:block"><NavbarUserActions /></div>
    
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.navbar {
  
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: auto;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
