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
            <div>
                <label for="location" class="block mb-1 font-semibold">Lieu</label>
                <input type="text" id="location" v-model="event.location" required class="input" placeholder="Lieu" />
            </div>
            <div>
                <label for="category" class="block mb-1 font-semibold">Catégorie</label>
                <input type="text" id="category" v-model="event.category" class="input" placeholder="Catégorie" />
            </div>
            <div>
                <label for="description" class="block mb-1 font-semibold">Description</label>
                <textarea id="description" v-model="event.description" class="input" placeholder="Description"></textarea>
            </div>
            <button type="submit" class="btn-submit">Ajouter l'événement</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { EventRequest } from '@/models/Event'
import { createEvent } from '@/controllers/Events'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

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

async function submitForm() {
  // Validation simple (tu peux ajouter zod ou autre si besoin)
  if (!event.title || !event.date || !event.location) {
    toast.add({
      severity: 'error',
      summary: t('event.create.error.title'),
      detail: t('event.create.error.requiredFields'),
      life: 4000,
    })
    return
  }
  try {
    const eventCreated = await createEvent({
      title: event.title,
      date: event.date instanceof Date ? event.date : new Date(event.date),
      location: event.location,
      description: event.description,
      category: event.category,
    })

    await router.push(`/event/${eventCreated.data.id}`)
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: t('event.create.error.title'),
      detail: error?.message || t('event.create.error.generic'),
      life: 5000,
    })
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
</style>