<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue'
import { getEventsByUser } from '@/controllers/Events';
import EventCard from '../events/EventCard.vue';
import type { Event } from '@/models/Event';
import type { EventStatus } from '@/models/EventStatus';
import { useRouter } from 'vue-router';

const { t } = useI18n()
const router = useRouter()
const events = ref<Event[]>([]);
const isLoading = ref(true);

onMounted(() => {
  getEventsByUser()
    .then(response => {
      // Handle different response structures
      const eventsData = Array.isArray(response) ? response : (response as any)?.data || [];
      events.value = eventsData.map((v: any) => ({
        ...v,
        status: v.status as EventStatus | null
      })) ?? [];
    })
    .catch((error) => {
      console.error('Error fetching user events:', error);
    })
    .finally(() => {
      isLoading.value = false;
    });
});

function editEvent(eventId: string) {
  router.push(`/edit_event/${eventId}`)
}

</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center py-20">
    <div class="text-center">
      <i class="pi pi-spin pi-spinner text-4xl text-blue-500 mb-4"></i>
      <p class="text-lg text-gray-600">Chargement de vos événements...</p>
    </div>
  </div>
  
  <div v-else class="max-w-5xl mx-auto my-8">
    <h2 class="text-2xl font-semibold mb-4">{{ t('userInfoEvents.title') }}</h2>
    <div v-if="events.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="e in events" :key="e.id" class="relative group">
        <EventCard :event="e" />
        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            @click="editEvent(e.id!)" 
            class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
            title="Modifier l'événement"
          >
            <i class="pi pi-pencil text-sm"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-12 text-gray-500">
      <p class="text-lg">Aucun événement trouvé</p>
      <RouterLink 
        to="/create_event" 
        class="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Créer votre premier événement
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.group:hover .absolute {
  transform: scale(1.05);
}

.group .absolute button {
  backdrop-filter: blur(4px);
  background-color: rgba(37, 99, 235, 0.9);
}

.group .absolute button:hover {
  background-color: rgba(29, 78, 216, 0.9);
}
</style>