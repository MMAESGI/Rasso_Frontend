<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { getEventsBySearch } from '@/controllers/Events'
import type { Event } from '@/models/Event'

const { t } = useI18n()
const router = useRouter()
const searchQuery = ref('')
const searchResults = ref<Event[]>([])
const isLoading = ref(false)

// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout>
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }) as T
}

// Debounced search function
const debouncedSearch = debounce(async (query: string) => {
  if (!query || query.length < 3) {
    searchResults.value = []
    return
  }

  try {
    isLoading.value = true
    console.log('Searching for:', query)
    const results = await getEventsBySearch(query)
    searchResults.value = results
    console.log('Search results:', results)
  } catch (error) {
    console.error('Error searching events:', error)
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}, 500)

// Watch for changes in search query
watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery)
})

// Navigate to event
function goToEvent(eventId: string | undefined) {
  if (eventId) {
    router.push(`/event/${eventId}`)
    searchQuery.value = ''
    searchResults.value = []
  }
}

// Format date
function formatDate(date: Date | string | undefined) {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="min-w-[40vw] relative">
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        v-model="searchQuery"
        :fluid="true"
        class="searchbar"
        type="text"
        :placeholder="t('homepage.navbar.search')"
      />
    </IconField>
    
    <!-- Dropdown with search results -->
    <div 
      v-if="searchQuery.length >= 3" 
      class="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto"
    >
      <!-- Loading state -->
      <div v-if="isLoading" class="p-4 text-center text-gray-500">
        <i class="pi pi-spin pi-spinner mr-2"></i>
        Recherche en cours...
      </div>
      
      <!-- Search results -->
      <div v-else-if="searchResults.length > 0">
        <div 
          v-for="event in searchResults" 
          :key="event.id"
          class="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
          @click="goToEvent(event.id)"
        >
          <div class="font-semibold text-sm text-gray-800">{{ event.title }}</div>
          <div class="text-xs text-gray-600 mt-1">
            <i class="pi pi-map-marker mr-1"></i>{{ event.location }}
          </div>
          <div class="text-xs text-gray-500 mt-1" v-if="event.date">
            <i class="pi pi-calendar mr-1"></i>{{ formatDate(event.date) }}
          </div>
        </div>
      </div>
      
      <!-- No results -->
      <div v-else class="p-4 text-center text-gray-500">
        Aucun événement trouvé
      </div>
    </div>
  </div>
</template>

<style scoped>
.searchbar {
  border-radius: 100px;
  width: 100%;
  padding: 0.75rem 1rem;
}
</style>
