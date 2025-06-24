<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="min-w-[40vw]">
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        :fluid="true"
        class="searchbar"
        type="text"
        :placeholder="t('homepage.navbar.search')"
      />
    </IconField>
  </div>
</template>

<style scoped>
.searchbar {
  border-radius: 100px;
  width: 100%;
  padding: 0.75rem 1rem;
}
</style>
