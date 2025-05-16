<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

const languageMenu = useTemplateRef('languageMenu');
const selectedLang = ref("EN");
const items = ref([
  {
    items: [
      {
        label: "🇫🇷 Français",
        command: () => {selectedLang.value = "FR"}
      },
      {
        label: "🇬🇧 English",
        command: () => {selectedLang.value = "EN"}
      },
    ]
  }
])


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
    <span class="cursor-pointer"><i class="pi pi-user text-2xl py-[12px] px-4"></i></span>
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