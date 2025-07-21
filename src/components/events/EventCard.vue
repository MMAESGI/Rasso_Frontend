<template>
  <div class="flex flex-col event-card group">
    <div class="overflow-hidden rounded-[3%] card-image">
      <RouterLink :to="`/event/${event.id}`">
        <img
          class="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-125"
          :src="event.imageUrls?.[0] || 'https://picsum.photos/seed/picsum/200/300'"
          :alt="event.title"
        />
      </RouterLink>
    </div>
    <div class="card-info">
      <span class="location">{{ event.location }}</span>
      <RouterLink :to="`/event/${event.id}`"><span class="event-title">{{ event.title }}</span></RouterLink>
      <span class="date">{{ formattedDate }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Event } from '@/models/Event';

const props = defineProps<{ event: Event }>();

// Format date for display
const formattedDate = props.event.date
  ? new Date(props.event.date).toLocaleString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  : '';
</script>

<style scoped>
.event-card {
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  cursor: pointer;
}

.card-image {
  aspect-ratio: 1 / 1;
  width: 100%;
}

.card-info {
  padding: 0.5rem 0;
}

.location {
  font-size: 0.9rem;
  color: #6b7280;
  display: block;
}

.event-title {
  font-size: 1.1rem;
  font-weight: 600;
  display: block;
  margin: 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date {
  font-size: 0.9rem;
  color: #6b7280;
  display: block;
}

@media (max-width: 768px) {
  .event-card {
    width: 100%;
    max-width: 250px;
    margin: 0;
  }

  .card-image {
    aspect-ratio: 1 / 1;
  }

  .location,
  .date {
    font-size: 0.8rem;
  }

  .event-title {
    font-size: 0.95rem;
  }
}
</style>
