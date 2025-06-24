<template>
  <div class="pt-10">
    <div v-if="!isMobile" class="photo-carousel p-4 mx-auto mb-8">
      <h1 class="text-3xl font-bold mb-8 text-center">{{ t('community.gallery.title') }}</h1>

      <Carousel :value="images" :numVisible="4" :numScroll="1" :circular="true">
        <template #item="slotProps">
          <div class="carousel-item">
            <div class="square-image-container">
              <img :src="slotProps.data" class="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </template>
      </Carousel>
    </div>

    <div v-else class="mobile-carousel-container mb-8">
      <div class="mobile-carousel-scroll">
        <div v-for="(image, index) in images" :key="index" class="mobile-carousel-item">
          <div class="square-image-container-mobile">
            <img :src="image" class="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </div>

    <div class="p-8">
      <h1 class="text-3xl font-bold mb-8 text-center">{{ t('community.rankings.title') }}</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-xl font-semibold mb-4">{{ t('community.rankings.topOrganizers') }}</h2>
          <ol class="list-decimal list-inside space-y-2">
            <li>
              <span class="font-medium">Alice</span> — 24 {{ t('community.rankings.events') }}
            </li>
            <li><span class="font-medium">Marc</span> — 19 {{ t('community.rankings.events') }}</li>
            <li>
              <span class="font-medium">Sophie</span> — 16 {{ t('community.rankings.events') }}
            </li>
            <li><span class="font-medium">Hugo</span> — 14 {{ t('community.rankings.events') }}</li>
          </ol>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-xl font-semibold mb-4">{{ t('community.rankings.topParticipants') }}</h2>
          <ol class="list-decimal list-inside space-y-2">
            <li>
              <span class="font-medium">Jean</span> — 58
              {{ t('community.rankings.participations') }}
            </li>
            <li>
              <span class="font-medium">Camille</span> — 54
              {{ t('community.rankings.participations') }}
            </li>
            <li>
              <span class="font-medium">Sami</span> — 47
              {{ t('community.rankings.participations') }}
            </li>
            <li>
              <span class="font-medium">Luc</span> — 43 {{ t('community.rankings.participations') }}
            </li>
          </ol>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md text-center">
        <h2 class="text-xl font-semibold mb-4">{{ t('community.stats.title') }}</h2>
        <p class="text-lg">
          👥 <span class="font-bold">320</span> {{ t('community.stats.users') }}
        </p>
        <p class="text-lg mt-2">
          🎤 <span class="font-bold">28</span> {{ t('community.stats.organizers') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel'
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isMobile = ref(false)
const images = ref([
  'https://picsum.photos/id/1/500/500',
  'https://picsum.photos/id/10/500/500',
  'https://picsum.photos/id/100/500/500',
  'https://picsum.photos/id/1000/500/500',
  'https://picsum.photos/id/1001/500/500',
  'https://picsum.photos/id/1002/500/500',
  'https://picsum.photos/id/1003/500/500',
  'https://picsum.photos/id/1004/500/500',
])

// Détecte si l'appareil est mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.photo-carousel {
  width: 95vw;
  max-width: 1400px;
}

.carousel-item {
  display: flex;
  justify-content: center;
  padding: 0 8px;
}

.square-image-container {
  width: 250px;
  height: 250px;
  margin: 0 auto;
}

.mobile-carousel-container {
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
}

.mobile-carousel-scroll {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 0.5rem 0;
  scrollbar-width: none;
  gap: 12px;
}

.mobile-carousel-scroll::-webkit-scrollbar {
  display: none;
}

.mobile-carousel-item {
  flex: 0 0 auto;
  width: 250px;
}

.square-image-container-mobile {
  width: 250px;
  height: 250px;
}
</style>
