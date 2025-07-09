<script setup lang="ts">
import EventCard from '@/components/events/EventCard.vue'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Event } from '@/models/Event'

const { t } = useI18n()

const favourites = ref<Event[]>([])
const isLoading = ref(true)

// Simulation de chargement des favoris depuis une API
onMounted(() => {
  // Simule un appel API pour récupérer les favoris
  setTimeout(() => {
    favourites.value = [
      {
        id: '1',
        title: 'Concert de Jazz',
        date: new Date('2023-10-15'),
        location: 'Paris',
        description: 'Un concert de jazz exceptionnel avec des artistes renommés.',
        category: 'Musique',
        isFavorite: true,
      },
      {
        id: '2',
        title: "Exposition d'Art Contemporain",
        date: new Date('2023-11-01'),
        location: 'Londres',
        description: "Une exposition d'art contemporain avec des œuvres d'artistes émergents.",
        category: 'Art',
        isFavorite: true,
      },
    ]
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
    <div class="text-center">
      <i class="pi pi-spin pi-spinner text-4xl text-blue-500 mb-4"></i>
      <p class="text-lg text-gray-600">{{ t('favourites.loading') }}</p>
    </div>
  </div>

  <div v-else>
    <div class="p-4 pt-10 max-w-7xl mx-auto">
      <p class="text-4xl font-bold mb-4">{{ t('favourites.title') }}</p>
    </div>

    <div class="border-b-2 border-gray-200 mb-4"></div>

    <div class="max-w-5xl mx-auto p-6">
      <div v-if="favourites.length > 0" class="grid gap-6 justify-items-center">
        <div
          class="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-6 justify-center w-full"
        >
          <EventCard v-for="event in favourites" :key="event.id" :event="event" />
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center text-gray-500 py-12 text-xl gap-6">
        <span>{{ t('favourites.empty') }}</span>
        <RouterLink
          to="/"
          class="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold shadow"
        >
          {{ t('favourites.add') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
