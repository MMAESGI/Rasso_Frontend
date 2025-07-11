<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import NavbarActions from './NavbarActions.vue'
import NavbarLogo from './NavbarLogo.vue'
import NavbarSearch from './NavbarSearch.vue'
import NavbarUserActions from './NavbarUserActions.vue'
import { useRouter } from 'vue-router'

const menu = useTemplateRef('menu')
const router = useRouter()
const items = ref([
  {
    separator: true,
  },
  {
    items: [
      {
        label: 'Carte',
        icon: 'pi pi-map',
      },
    ],
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
        label: 'Favoris',
        icon: 'pi pi-heart',
        command: () => {
          router.push('/favourites')
        },
      },
      {
        label: 'Community',
        icon: 'pi pi-comment',
        command: () => {
          router.push('/community')
        },
      },
      {
        label: 'Login',
        icon: 'pi pi-user',
        command: () => {
          router.push('/login')
        },
      },
    ],
  },
])
function toggle(event: Event) {
  menu.value?.toggle(event)
}
</script>

<template>
  <nav class="bg-white shadow-md w-full md:fixed relative" style="z-index: 1000">
    <div class="mx-auto px-4 max-w-[100vw]">
      <div class="grid grid-cols-12 h-20">
        <!-- Mobile menu button - takes full width on mobile, hidden on md+ -->
        <div class="col-span-2 flex items-center md:hidden">
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

        <!-- Logo - 15% width on desktop -->
        <div class="hidden md:flex md:items-center col-span-2 px-3">
          <RouterLink to="/" class="flex items-center">
            <NavbarLogo />
          </RouterLink>
        </div>

        <!-- Center section with search - 70% width -->
        <div class="col-span-8 flex items-center justify-between gap-4">
          <div class="hidden md:flex md:items-center">
            <NavbarActions />
          </div>
          <div class="flex-1 max-w-[100%] mx-auto">
            <NavbarSearch />
          </div>
          <div class="hidden md:block w-[100px]">
            <!-- Spacer pour équilibrer la mise en page -->
          </div>
        </div>

        <!-- User actions - 15% width on desktop -->
        <div class="hidden md:flex md:items-center col-span-2 justify-end">
          <NavbarUserActions />
        </div>
      </div>
    </div>
  </nav>
</template>
