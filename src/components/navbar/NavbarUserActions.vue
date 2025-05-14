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
  <div class="flex items-center">
    <span @click="openLanguageMenu" class="flex items-center px-2 border-r-2 border-solid border-r-gray-300 border-y-0 border-l-0"><i class="pi pi-globe text-xl py-[9px] px-[6px]"></i>{{ selectedLang }}</span>
    <span class="border-r-2 border-solid border-r-gray-300 border-y-0 border-l-0"><i class="pi pi-heart text-xl py-[9px] px-3"></i></span>
    <span><i class="pi pi-user text-xl py-[9px] px-3"></i></span>
    <Menu ref="languageMenu" id="overlay_menu" :model="items" :popup="true" class="[&_*]:p-0">  
    </Menu>
  </div>
</template>
