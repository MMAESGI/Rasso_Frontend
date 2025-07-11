<template>
  <div class="not-found-container">
    <h1 class="error-code">{{ t('notFound.errorCode') }}</h1>
    <h2 class="error-message">{{ t('notFound.title') }}</h2>
    <p>{{ t('notFound.description') }}</p>
    <RouterLink to="/" class="home-button">{{ t('notFound.backHome') }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.error-code {
  font-size: 8rem;
  margin: 0;
  color: #e74c3c;
}

.error-message {
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.home-button {
  margin-top: 2rem;
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #2980b9;
}
</style>
