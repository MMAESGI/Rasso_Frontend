<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue'
import { getEventsByUser } from '@/controllers/Events';
import EventCard from '../events/EventCard.vue';
import type { Event } from '@/models/Event';
import type { EventStatus } from '@/models/EventStatus';


const { t } = useI18n()
const events = ref<Event[]>([]);

onMounted(() => {
    getEventsByUser().then(response => {
      events.value = response.data?.map((v) => {
        return {
            ...v,
            status: v.status as number as EventStatus // Typescript de con
        }
      }) ?? [];
    })
})

</script>

<template>
  <div class="max-w-5xl mx-auto my-8">
    <h2 class="text-2xl font-semibold mb-1">{{ t('userInfoEvents.title') }}</h2>
    <div class="grid grid-cols-4">
      <div v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div>
    </div>
  </div>
</template>