<template>
    <div class="create-event">
        <h1 class="text-3xl font-bold mb-6 text-center">Créer un événement</h1>
        <form @submit.prevent="submitForm" class="space-y-6">
            <div>
                <label for="title" class="block mb-1 font-semibold">Titre de l'événement</label>
                <input type="text" id="title" v-model="event.title" required class="input" placeholder="Titre" />
            </div>
            <div>
                <label for="date" class="block mb-1 font-semibold">Date</label>
                <input type="date" id="date" v-model="event.date" required class="input" />
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
            <button type="submit" class="btn-submit" :disabled="isSubmitting">
              <i v-if="isSubmitting" class="pi pi-spin pi-spinner mr-2"></i>
              {{ isSubmitting ? 'Création en cours...' : 'Ajouter l\'événement' }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { EventRequest } from '@/models/Event'
import { createEvent } from '@/controllers/Events'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { debouncedSearchLocations } from '@/services/geolocation'

const router = useRouter()
const toast = useToast()
const { t } = useI18n()

const event = reactive<EventRequest>({
    title: '',
    date: undefined,
    location: '',
    description: '',
    category: ''
})

const images = ref<File[]>([])
const selectedLocation = ref<{ lat: number; lng: number; name: string } | null>(null)
const locationSuggestions = ref<any[]>([])
const showSuggestions = ref(false)
const locationQuery = ref('')
const isSearchingLocation = ref(false)
const isSubmitting = ref(false)

function handleImageChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  const files = Array.from(target.files)
  // Limite à 5 images
  if (files.length + images.value.length > 5) {
    toast.add({
      severity: 'warn',
      summary: t('event.create.error.title'),
      detail: t('event.create.error.maxImages', { max: 5 }),
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
    // Transforme les résultats de l'API française en format exploitable
    locationSuggestions.value = results.features || []
    showSuggestions.value = locationSuggestions.value.length > 0
    console.log('Location suggestions:', locationSuggestions.value) // Debug
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

async function submitForm() {
  // Validation simple (tu peux ajouter zod ou autre si besoin)
  if (!event.title || !event.date || !selectedLocation.value) {
    toast.add({
      severity: 'error',
      summary: t('event.create.error.title'),
      detail: t('event.create.error.requiredFields'),
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
    images.value.forEach((img, i) => formData.append('images', img))
    const eventCreated = await createEvent(formData)

    await router.push(`/event/${eventCreated.id}`)
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error)
    toast.add({
      severity: 'error',
      summary: t('event.create.error.title'),
      detail: t('event.create.error.generic'),
      life: 5000,
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.create-event {
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
    width: 100%;
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