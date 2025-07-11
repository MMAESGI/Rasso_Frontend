<template>
  <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
    <div class="text-center">
      <i class="pi pi-spin pi-spinner text-4xl text-blue-500 mb-4"></i>
      <p class="text-lg text-gray-600">Chargement de l'événement...</p>
    </div>
  </div>

  <div v-else class="edit-event">
    <h1 class="text-3xl font-bold mb-6 text-center">Modifier l'événement</h1>
    <form @submit.prevent="submitForm" class="space-y-6">
      <div>
        <label for="title" class="block mb-1 font-semibold">Titre de l'événement</label>
        <input type="text" id="title" v-model="event.title" required class="input" placeholder="Titre" />
      </div>
      <div>
        <label for="date" class="block mb-1 font-semibold">Date</label>
        <input type="date" id="date" v-model="formattedDate" required class="input" />
      </div>
      <div class="relative">
        <label for="location" class="block mb-1 font-semibold">Lieu</label>
        <div class="location-input-container">
          <input 
            type="text" 
            id="location" 
            v-model="locationQuery" 
            @input="searchLocation"
            @focus="showSuggestions = locationSuggestions.length > 0"
            required 
            class="input" 
            placeholder="Tapez pour rechercher un lieu" 
            autocomplete="off"
          />
          <div v-if="isSearchingLocation" class="loading-spinner">
            <i class="pi pi-spin pi-spinner"></i>
          </div>
        </div>
        
        <div v-if="showSuggestions && locationSuggestions.length > 0" class="location-suggestions">
          <div 
            v-for="suggestion in locationSuggestions" 
            :key="suggestion.properties?.id || Math.random()"
            @click="selectLocation(suggestion)"
            class="suggestion-item"
          >
            {{ suggestion.properties?.label || 'Label manquant' }}
          </div>
        </div>
        
        <!-- Selected location display -->
        <div v-if="selectedLocation" class="selected-location">
          <span class="location-name">📍 {{ selectedLocation.name }}</span>
          <button type="button" @click="clearLocation" class="clear-btn">✕</button>
        </div>
      </div>
      <div>
        <label for="category" class="block mb-1 font-semibold">Catégorie</label>
        <input type="text" id="category" v-model="event.category" class="input" placeholder="Catégorie" />
      </div>
      <div>
        <label for="description" class="block mb-1 font-semibold">Description</label>
        <textarea id="description" v-model="event.description" class="input" placeholder="Description"></textarea>
      </div>
      <div>
        <label for="images" class="block mb-1 font-semibold">Images</label>
        <input type="file" id="images" @change="handleImageChange" multiple class="input" />
        <div class="mt-2">
          <span v-for="(image, index) in images" :key="index" class="inline-block mr-2">
            <img :src="createImageUrl(image)" class="h-20 w-20 object-cover rounded" :alt="`${index + 1}`" />
            <button type="button" @click="removeImage(index)" class="text-red-500 hover:text-red-700">
              &times;
            </button>
          </span>
        </div>
      </div>
      <div class="flex gap-4">
        <button type="button" @click="goBack" class="btn-secondary flex-1">
          Annuler
        </button>
        <button type="submit" class="btn-submit flex-1" :disabled="isSubmitting">
          <i v-if="isSubmitting" class="pi pi-spin pi-spinner mr-2"></i>
          {{ isSubmitting ? 'Modification en cours...' : 'Mettre à jour l\'événement' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import type { EventRequest, Event } from '@/models/Event'
import { updateEvent, getEventById } from '@/controllers/Events'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { debouncedSearchLocations } from '@/services/geolocation'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const eventId = route.params.id as string
const isLoading = ref(true)
const isSubmitting = ref(false)

const event = reactive<EventRequest>({
  title: '',
  date: undefined,
  location: '',
  description: '',
  category: ''
})

const originalEvent = ref<Event | null>(null)
const images = ref<File[]>([])
const selectedLocation = ref<{ lat: number; lng: number; name: string } | null>(null)
const locationSuggestions = ref<any[]>([])
const showSuggestions = ref(false)
const locationQuery = ref('')
const isSearchingLocation = ref(false)

// Computed pour formater la date pour l'input date
const formattedDate = computed({
  get() {
    if (!event.date) return ''
    const date = event.date instanceof Date ? event.date : new Date(event.date)
    return date.toISOString().split('T')[0]
  },
  set(value: string) {
    event.date = new Date(value)
  }
})

onMounted(async () => {
  try {
    console.log('Loading event with ID:', eventId)
    const fetchedEvent = await getEventById(eventId)
    console.log('Fetched event:', fetchedEvent)
    
    if (fetchedEvent) {
      originalEvent.value = fetchedEvent
      // Remplir le formulaire avec les données existantes
      event.title = fetchedEvent.title || ''
      event.date = fetchedEvent.date ? new Date(fetchedEvent.date) : undefined
      event.location = fetchedEvent.location || ''
      event.description = fetchedEvent.description || ''
      event.category = fetchedEvent.category || ''
      
      // Initialiser la localisation
      if (fetchedEvent.latitude && fetchedEvent.longitude) {
        selectedLocation.value = {
          lat: fetchedEvent.latitude,
          lng: fetchedEvent.longitude,
          name: fetchedEvent.location || ''
        }
      }
      locationQuery.value = fetchedEvent.location || ''
    } else {
      console.warn('No event data received')
      toast.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Aucune donnée d\'événement trouvée',
        life: 4000,
      })
      router.push('/user/events')
    }
  } catch (error) {
    console.error('Error loading event:', error)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de charger l\'événement',
      life: 4000,
    })
    router.push('/user/events')
  } finally {
    isLoading.value = false
  }
})

function handleImageChange(e: any) {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  const files = Array.from(target.files)
  // Limite à 5 images
  if (files.length + images.value.length > 5) {
    toast.add({
      severity: 'warn',
      summary: 'Attention',
      detail: 'Maximum 5 images autorisées',
      life: 4000,
    })
    return
  }
  images.value = images.value.concat(files).slice(0, 5)
}

function removeImage(idx: number) {
  images.value.splice(idx, 1)
}

function createImageUrl(image: File) {
  return URL.createObjectURL(image)
}

async function searchLocation() {
  if (!locationQuery.value || locationQuery.value.length < 3) {
    locationSuggestions.value = []
    showSuggestions.value = false
    isSearchingLocation.value = false
    return
  }
  
  isSearchingLocation.value = true
  
  try {
    const results = await debouncedSearchLocations(locationQuery.value)
    locationSuggestions.value = results.features || []
    showSuggestions.value = locationSuggestions.value.length > 0
  } catch (error) {
    console.error('Error searching locations:', error)
    locationSuggestions.value = []
    showSuggestions.value = false
  } finally {
    isSearchingLocation.value = false
  }
}

function selectLocation(location: any) {
  const { coordinates } = location.geometry
  const label = location.properties.label

  selectedLocation.value = {
    lat: coordinates[1],
    lng: coordinates[0],
    name: label
  }

  locationQuery.value = label
  event.location = label
  showSuggestions.value = false
}

function clearLocation() {
  selectedLocation.value = null
  locationQuery.value = ''
  event.location = ''
  showSuggestions.value = false
}

function goBack() {
  router.push('/user/events')
}

async function submitForm() {
  // Validation
  if (!event.title || !event.date || !selectedLocation.value) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Veuillez remplir tous les champs obligatoires',
      life: 4000,
    })
    return
  }
  
  isSubmitting.value = true
  
  try {
    const formData = new FormData()
    formData.append('title', event.title || '')
    formData.append('date', event.date instanceof Date ? event.date.toISOString() : new Date(event.date as any).toISOString())
    formData.append('location', selectedLocation.value.name)
    formData.append('latitude', selectedLocation.value.lat.toString())
    formData.append('longitude', selectedLocation.value.lng.toString())
    formData.append('description', event.description || '')
    formData.append('category', event.category || '')
    images.value.forEach((img) => formData.append('images', img))
    
    await updateEvent(eventId, formData)
    
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Événement mis à jour avec succès',
      life: 4000,
    })

    router.push(`/event/${eventId}`)
  } catch (error) {
    console.error('Erreur lors de la modification de l\'événement:', error)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de mettre à jour l\'événement',
      life: 5000,
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.edit-event {
  max-width: 80%;
  margin: 2rem auto;
  padding: 2.5rem 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.07);
}

.input {
  width: 100%;
  padding: 0.6rem 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: #f9fafb;
  transition: border 0.2s;
}

.input:focus {
  border: 1.5px solid #6366f1;
  outline: none;
  background: #fff;
}

.btn-submit {
  padding: 0.7rem 0;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(99,102,241,0.10);
  transition: background 0.2s;
}

.btn-submit:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #9ca3af;
}

.btn-secondary {
  padding: 0.7rem 0;
  background: #6b7280;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background: #4b5563;
}

.location-suggestions {
  position: absolute;
  z-index: 10;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 0.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.suggestion-item {
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.suggestion-item:hover {
  background: #f1f5f9;
}

.selected-location {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #e0f7fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.location-name {
  font-weight: 500;
  color: #00796b;
}

.clear-btn {
  background: transparent;
  border: none;
  color: #d32f2f;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s;
}

.clear-btn:hover {
  color: #c62828;
}

.location-input-container {
  position: relative;
}

.loading-spinner {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #6366f1;
}
</style>
