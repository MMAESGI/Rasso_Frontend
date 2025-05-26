
<script setup lang="ts">
import EventCard from '@/components/events/EventCard.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Exemple de favoris, à remplacer par tes vrais favoris
const favourites = ref([
    {
        id: 1,
        name: "Concert de Jazz",
        date: "2023-10-15",
        location: "Paris",
        description: "Un concert de jazz exceptionnel avec des artistes renommés.",
        imageUrl: "https://example.com/jazz-concert.jpg"
    },
    {
        id: 2,
        name: "Exposition d'Art Contemporain",
        date: "2023-11-01",
        location: "Londres",
        description: "Une exposition d'art contemporain avec des œuvres d'artistes émergents.",
        imageUrl: "https://example.com/art-exhibition.jpg"
    }
])
</script>

<template>
    <div class="p-4 pt-10 max-w-7xl mx-auto">
        <p class="text-4xl font-bold mb-4">{{ t("favourites.title") }}</p>
    </div>

    <div class="border-b-2 border-gray-200 mb-4"></div>

    <div class="max-w-5xl mx-auto p-6">
        <div v-if="favourites.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EventCard
                v-for="event in favourites"
                :key="event.id"
                :event="event"
            />
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
</template>
