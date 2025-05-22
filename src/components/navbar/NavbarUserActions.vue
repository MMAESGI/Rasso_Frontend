<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const languageMenu = useTemplateRef('languageMenu');
const selectedLang = ref("EN");
const items = ref([
  {
    items: [
      {
        label: "🇫🇷 Français",
        command: () => setLang('fr', 'FR')
      },
      {
        label: "🇬🇧 English",
        command: () => setLang('en', 'EN')
      },
    ]
  }
])

onMounted(() => {
  const savedLang = localStorage.getItem('lang')
  if (savedLang) {
    selectedLang.value = savedLang === 'fr' ? 'FR' : 'EN'
    locale.value = savedLang
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
</script>

<template>
  <div class="flex items-center text-lg pl-5">
    <span @click="openLanguageMenu" class="flex items-center px-3 border-r-1 border-solid border-r-gray-300 border-y-0 border-l-0 cursor-pointer pl-2">
      <i class="pi pi-globe text-2xl py-[12px] px-[8px]"></i>
      <span class="lang-selector">{{ selectedLang }}</span>
    </span>
    <span class="border-r-1 border-solid border-r-gray-300 border-y-0 border-l-0 cursor-pointer"><i class="pi pi-heart text-2xl py-[12px] px-4"></i></span>
    <RouterLink to="/login"><span class="cursor-pointer" ><i class="pi pi-user text-2xl py-[12px] px-4"></i></span></RouterLink>
    <Menu ref="languageMenu" id="overlay_menu" :model="items" :popup="true" class="[&_*]:p-0">  
    </Menu>
  </div>
</template>

<style scoped>
.lang-selector {
  display: inline-block;
  min-width: 2rem;
  text-align: center;
}
</style>