<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const firstname = ref('')
const lastname = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

function submitInfo() {
  // TODO: call API or emit event
  alert(t('userInfoForm.infoValidated'))
}

function submitPassword() {
  // TODO: call API or emit event
  if (password.value !== confirmPassword.value) {
    alert(t('userInfoForm.passwordsNotMatch'))
    return
  }
  alert(t('userInfoForm.passwordChanged'))
}

const showPassword = ref(false)
const showConfirmPassword = ref(false)
</script>

<template>
  <div class="max-w-5xl mx-auto mt-8">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-1">{{ t('userInfoForm.title') }}</h2>
      <p class="text-gray-600 text-sm">{{ t('userInfoForm.subtitle') }}</p>
    </div>
  </div>
  <div class="border-b-2 border-gray-200 mb-4"></div>
  <div class="max-w-5xl mx-auto mt-8">
    <form @submit.prevent="submitInfo" class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div>
        <label for="firstname" class="block mb-2 font-semibold">{{ t('userInfoForm.firstname') }}</label>
        <input id="firstname" v-model="firstname" class="w-full border rounded px-4 py-2" type="text" :placeholder="t('userInfoForm.firstname')" />
      </div>
      <div>
        <label for="lastname" class="block mb-2 font-semibold">{{ t('userInfoForm.lastname') }}</label>
        <input id="lastname" v-model="lastname" class="w-full border rounded px-4 py-2" type="text" :placeholder="t('userInfoForm.lastname')" />
      </div>
      <div class="md:col-span-2 flex flex-col gap-4">
        <div class="flex-1">
          <label for="username" class="block mb-2 font-semibold">{{ t('userInfoForm.username') }}</label>
          <input id="username" v-model="username" class="w-full border rounded px-4 py-2" type="text" :placeholder="t('userInfoForm.username')" />
        </div>
        <button type="submit" class="bg-green-600 hover:bg-green-500 text-white font-semibold rounded px-8 py-2 w-full md:w-auto">{{ t('userInfoForm.validate') }}</button>
      </div>
    </form>
    <form @submit.prevent="submitPassword" class="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
      <div>
        <label for="password" class="block mb-2 font-semibold">{{ t('userInfoForm.newPassword') }}</label>
        <div class="relative">
          <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password" class="w-full border rounded px-4 py-2 pr-10" :placeholder="t('userInfoForm.newPassword')" />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" @click="showPassword = !showPassword">
            <i v-if="!showPassword" class="pi pi-eye-slash text-2xl"></i>
            <i v-else class="pi pi-eye text-2xl"></i>
          </span>
        </div>
      </div>
      <div>
        <label for="confirmPassword" class="block mb-2 font-semibold">{{ t('userInfoForm.confirmPassword') }}</label>
        <div class="relative">
          <input id="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" class="w-full border rounded px-4 py-2 pr-10" :placeholder="t('userInfoForm.confirmPassword')" />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" @click="showConfirmPassword = !showConfirmPassword">
            <i v-if="!showConfirmPassword" class="pi pi-eye-slash text-2xl"></i>
            <i v-else class="pi pi-eye text-2xl"></i>
          </span>
        </div>
      </div>
      <div class="md:col-span-2 flex justify-end mt-4">
        <button type="submit" class="bg-green-600 hover:bg-green-500 text-white font-semibold rounded px-12 py-2">{{ t('userInfoForm.validate') }}</button>
      </div>
    </form>
  </div>
</template>