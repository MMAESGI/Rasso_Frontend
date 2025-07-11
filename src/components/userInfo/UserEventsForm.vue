<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getUserByEmail, updateUser } from '@/controllers/User'
import { rassoApiService } from '@/services/rasso-api.service'
import { EventResponse } from '@mmaesgi/rassoapi-client'

const { t } = useI18n()

const user_id = ref("")
const firstname = ref('')
const lastname = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const events = ref<EventResponse[]>([]);
const isLoading = ref(true);

onMounted(() => {
  // Fetch user data on mount
  Promise.all([
    getUserByEmail(),
    rassoApiService.eventsGET()
  ]).then(([user, eventsResponse]) => {
    user_id.value = user.id || ''
    firstname.value = user.firstName || ''
    lastname.value = user.lastName || ''
    username.value = user.username || ''
    events.value = eventsResponse.data ?? [];
  }).catch(error => {
    console.error('Failed to fetch data:', error)
    alert(t('userInfoForm.fetchError'))
  }).finally(() => {
    isLoading.value = false
  })
})

async function submitInfo() {
  await updateUser(user_id.value, {
    firstName: firstname.value,
    lastName: lastname.value,
    username: username.value
  })
  alert(t('userInfoForm.infoValidated'))
}

function submitPassword() {
  if (password.value !== confirmPassword.value) {
    alert(t('userInfoForm.passwordsNotMatch'))
    return
  }
  // Call API to update password (cast to any to bypass type check)
  updateUser(user_id.value, { password: password.value } as any)
    .then(() => {
      alert(t('userInfoForm.passwordChanged'))
      password.value = ''
      confirmPassword.value = ''
    })
    .catch((error) => {
      console.error('Error updating password:', error)
      alert(t('userInfoForm.updateError'))
    })
}

const showPassword = ref(false)
const showConfirmPassword = ref(false)
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
    <div class="text-center">
      <i class="pi pi-spin pi-spinner text-4xl text-blue-500 mb-4"></i>
      <p class="text-lg text-gray-600">Chargement des informations utilisateur...</p>
    </div>
  </div>

  <div v-else>
    <div class="max-w-5xl mx-auto mt-8">
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-1">{{ t('userInfoForm.title') }}</h2>
        <p class="text-gray-600 text-sm">{{ t('userInfoForm.subtitle') }}</p>
      </div>
    </div>
    <div class="border-b-2 border-gray-200 mb-4"></div>
    <div class="max-w-5xl mx-auto my-8">
      <form @submit.prevent="submitInfo" class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label for="firstname" class="block mb-2 font-semibold">{{ t('userInfoForm.firstname') }}</label>
          <input id="firstname" v-model="firstname" class="w-full border rounded px-4 py-2" type="text"
            :placeholder="t('userInfoForm.firstname')" />
        </div>
        <div>
          <label for="lastname" class="block mb-2 font-semibold">{{ t('userInfoForm.lastname') }}</label>
          <input id="lastname" v-model="lastname" class="w-full border rounded px-4 py-2" type="text"
            :placeholder="t('userInfoForm.lastname')" />
        </div>
        <div class="md:col-span-2 flex flex-col gap-4">
          <div class="flex-1">
            <label for="username" class="block mb-2 font-semibold">{{ t('userInfoForm.username') }}</label>
            <input id="username" v-model="username" class="w-full border rounded px-4 py-2" type="text"
              :placeholder="t('userInfoForm.username')" />
          </div>
          <button type="submit"
            class="bg-green-600 hover:bg-green-500 text-white font-semibold rounded px-8 py-2 w-full md:w-auto">{{
              t('userInfoForm.validate') }}</button>
        </div>
      </form>
      <form @submit.prevent="submitPassword" class="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <div>
          <label for="password" class="block mb-2 font-semibold">{{ t('userInfoForm.newPassword') }}</label>
          <div class="relative">
            <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password"
              class="w-full border rounded px-4 py-2 pr-10" :placeholder="t('userInfoForm.newPassword')" />
            <span class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              @click="showPassword = !showPassword">
              <i v-if="!showPassword" class="pi pi-eye-slash text-2xl"></i>
              <i v-else class="pi pi-eye text-2xl"></i>
            </span>
          </div>
        </div>
        <div>
          <label for="confirmPassword" class="block mb-2 font-semibold">{{ t('userInfoForm.confirmPassword') }}</label>
          <div class="relative">
            <input id="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword"
              class="w-full border rounded px-4 py-2 pr-10" :placeholder="t('userInfoForm.confirmPassword')" />
            <span class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              @click="showConfirmPassword = !showConfirmPassword">
              <i v-if="!showConfirmPassword" class="pi pi-eye-slash text-2xl"></i>
              <i v-else class="pi pi-eye text-2xl"></i>
            </span>
          </div>
        </div>
        <div class="md:col-span-2 flex justify-end mt-4">
          <button type="submit" class="bg-green-600 hover:bg-green-500 text-white font-semibold rounded px-12 py-2">{{
            t('userInfoForm.validate') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>