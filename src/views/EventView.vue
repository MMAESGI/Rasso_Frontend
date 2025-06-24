<script setup lang="ts">
import EventImages from '@/components/events/EventImages.vue'
import SmallMap from '@/components/map/SmallMap.vue'

const description: string =
  "🏎️ Courses à couper le souffle : Qualifications et Grand Prix principal\n🎌 Ambiance japonaise authentique : Cerisiers, gastronomie locale\n🎮 Zone eSport & Sim Racing : Défis F1 virtuels avec prix à gagner\n🎆 Show nocturne : Feux d'artifice synchronisés avec des drones\n🍣 Food Market : Street food japonaise, saké bar, stands végétariens\n\nLes visiteurs vivront trois jours de pur spectacle, entre rugissements de moteurs et beauté nippone. Le paddock s’ouvre au public pour une immersion exclusive dans les coulisses de la F1. Le soir venu, l’événement se transforme en fête lumineuse : concerts, jeux de lumière, spectacles aériens et gastronomie de rue plongent les fans dans une atmosphère unique au monde."
const locations = [
  {
    lat: 35.785248,
    lng: 139.49366,
    name: 'Formule 1 - Grand Prix Japon',
  },
]
</script>

<template>
  <div class="md:px-80 px-5 py-10">
    <EventImages
      :images="[
        'https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Japan.jpg',
        'https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Japan.jpg',
        'https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Japan.jpg',
        'https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Japan.jpg',
        'https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Japan.jpg',
      ]"
      class="mb-10"
    />
    <div class="flex w-full flex-col md:flex-row">
      <div class="md:w-2/3 md:pr-10">
        <div class="flex justify-between items-center w-full">
          <span class="text-2xl font-bold">Formule 1 - Grand Prix Japon 2025</span>
          <div class="rounded-full pill-shadow flex items-center justify-center px-2.5 py-2">
            <i class="pi pi-heart mr-2"></i>
            <i class="pi pi-upload"></i>
          </div>
        </div>
        <hr class="my-8" />
        <div class="italic mb-8">
          Installé au pied du majestueux Mont Fuji, le tout nouveau Circuit Fuji Dreamspeed allie
          modernité technologique et paysages naturels spectaculaires.
        </div>
        <div class="" style="white-space: pre-wrap">{{ description }}</div>
      </div>
      <div class="md:w-1/3 mt-10 md:mt-0 flex flex-col">
        <div class="flex flex-row items-center font-semibold">
          <i class="pi pi-calendar text-2xl! mr-2"></i>
          <span>20 Juillet 2025, 22:30 CEST</span>
        </div>
        <div class="flex flex-row items-center font-semibold mb-2">
          <i class="pi pi-map-marker text-2xl! mr-2"></i>
          <span>25, rue Jean Pierre, 44300 Nantes, France</span>
        </div>
        <SmallMap :markers="locations" height="600px" />
      </div>
    </div>
  </div>
</template>

<style>
.pill-shadow {
  box-shadow: 1px 2px 7px 1px rgba(0, 0, 0, 0.24);
}
</style>
