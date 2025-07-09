<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue'
import { getEventsByUser } from '@/controllers/Events';
import EventCard from '../events/EventCard.vue';
import type { Event } from '@/models/Event';
import type { EventStatus } from '@/models/EventStatus';


const { t } = useI18n()
const events = ref<Event[]>([]);
const isLoading = ref(true);

onMounted(() => {
  getEventsByUser()
    .then(response => {
      // Adapt to new API response structure
      const eventsData = Array.isArray(response?.data) ? response.data : [];
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

</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center py-20">
    <div class="text-center">
      <i class="pi pi-spin pi-spinner text-4xl text-blue-500 mb-4"></i>
      <p class="text-lg text-gray-600">Chargement de vos événements...</p>
    </div>
  </div>
  
  <div v-else class="max-w-5xl mx-auto my-8">
    <h2 class="text-2xl font-semibold mb-1">{{ t('userInfoEvents.title') }}</h2>
    <div v-if="events.length > 0" class="grid grid-cols-4">
      <div v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div>
    </div>
    <div v-else class="text-center py-12 text-gray-500">
      <p class="text-lg">Aucun événement trouvé</p>
    </div>
  </div>
</template>