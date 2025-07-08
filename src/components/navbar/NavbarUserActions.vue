<script setup lang="ts">
import { ref, useTemplateRef, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { logout, isAuthenticated } from '@/controllers/Login'
import { useRouter } from 'vue-router'

const router = useRouter()
const { locale } = useI18n()

const languageMenu = useTemplateRef('languageMenu')
const userMenu = useTemplateRef('userMenu')
const selectedLang = ref('EN')
const items = ref([
  {
    items: [
      {
        label: '🇫🇷 Français',
        command: () => setLang('fr', 'FR'),
      },
      {
        label: '🇬🇧 English',
        command: () => setLang('en', 'EN'),
      },
    ],
  },
])

const isAuth = ref(isAuthenticated())

// Met à jour isAuth après logout
function handleLogout() {
  logout()
  isAuth.value = false
  router.push('/login')
}

const userMenuItems = computed(() => [
  {
    label: 'Compte',
    icon: 'pi pi-user',
    command: () => router.push('/user'),
    visible: isAuth.value,
  },
  {
    label: 'Déconnexion',
    icon: 'pi pi-sign-out',
    command: handleLogout,
    visible: isAuth.value,
  },
  {
    label: 'Connexion',
    icon: 'pi pi-sign-in',
    command: () => router.push('/login'),
    visible: !isAuth.value,
  },
])

const userRoute = computed(() => {
  return isAuthenticated() ? '/user' : '/login'
})

onMounted(() => {
  const savedLang = localStorage.getItem('lang')
  if (savedLang) {
    selectedLang.value = savedLang === 'fr' ? 'FR' : 'EN'
    locale.value = savedLang
  }
})

// Pour que le menu se mette à jour après login, écoute le storage event (multi-tab support)
window.addEventListener('storage', (e) => {
  if (e.key === 'auth_token') {
    isAuth.value = isAuthenticated()
  }
})

const setLang = (lang: string, label: string) => {
  selectedLang.value = label
  locale.value = lang
  localStorage.setItem('lang', lang)
}

function openLanguageMenu(event: Event) {
  languageMenu.value?.toggle(event)
}

function openUserMenu(event: Event) {
  userMenu.value?.toggle(event)
}
</script>

<template>
  <div class="flex items-center text-lg pl-5">
    <span
      @click="openLanguageMenu"
      class="flex items-center px-3 border-r-1 border-solid border-r-gray-300 border-y-0 border-l-0 cursor-pointer pl-2"
    >
      <i class="pi pi-globe text-2xl py-[12px] px-[8px]"></i>
      <span class="lang-selector">{{ selectedLang }}</span>
    </span>
    <RouterLink
      to="/favourites"
      class="border-r-1 border-solid border-r-gray-300 border-y-0 border-l-0 cursor-pointer"
    >
      <i class="pi pi-heart text-2xl py-[12px] px-4"></i>
    </RouterLink>
    <RouterLink
      to="/community"
      class="border-r-1 border-solid border-r-gray-300 border-y-0 border-l-0 cursor-pointer"
    >
      <i class="pi pi-camera text-2xl py-[12px] px-4"></i>
    </RouterLink>
    <span @click="openUserMenu" class="cursor-pointer">
      <i class="pi pi-user text-2xl py-[12px] px-4"></i>
    </span>
    <Menu ref="languageMenu" id="overlay_menu" :model="items" :popup="true" class="[&_*]:p-0">
    </Menu>
    <Menu ref="userMenu" id="user_menu" :model="userMenuItems" :popup="true" class="[&_*]:p-0" />
  </div>
</template>

<style scoped>
.lang-selector {
  display: inline-block;
  min-width: 2rem;
  text-align: center;
}
</style>
