<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Badge, Button, FloatLabel, InputText, Password, Toast } from 'primevue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { reactive } from 'vue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useI18n } from 'vue-i18n'
import { register } from '@/controllers/Login'
import type { RegisterRequest } from '@/models/Login'
import router from '@/router'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n()
const toast = useToast()

const initialValues = reactive({
  lastName: '',
  firstName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const resolver = zodResolver(
  z
    .object({
      lastName: z.string().optional().or(z.literal('')),
      firstName: z.string().optional().or(z.literal('')),
      username: z.string().min(1, t('connexion.register.error.usernameRequired')),
      email: z.string().email(t('connexion.register.error.emailInvalid')),
      password: z.string().min(8, t('connexion.register.error.passwordMin')),
      confirmPassword: z.string(),
    })
    .superRefine((val, ctx) => {
      if (val.confirmPassword !== val.password) {
        ctx.addIssue({
          code: 'custom',
          message: t('connexion.register.error.passwordsNotMatch'),
          path: ['confirmPassword'],
        })
      }
    }),
)

function onFormSubmit(event: FormSubmitEvent<RegisterRequest>) {
  const { valid, values } = event

  if (valid) {
    const registerRequest: RegisterRequest = {
      lastName: values.lastName,
      firstName: values.firstName,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    }
    register(registerRequest)
      .then(() => {
        router.push('/login')
      })
      .catch((error: Error) => {
        toast.add({
          severity: 'error',
          summary: t('connexion.register.error.toastTitle'),
          detail: error.message || t('connexion.register.error.toastMessage'),
          life: 5000,
        })
      })
  }
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center py-12">
    <div
      class="shadow-xl rounded w-[90%] md:w-[800px] md:min-h-3/4 p-12 flex flex-col justify-between"
    >
      <h2 class="text-3xl font-semibold text-center">{{ $t('connexion.register.title') }}</h2>
      <Form
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="flex flex-col login-inputs my-5"
      >
        <div class="md:grid md:grid-cols-2 md:gap-x-4">
          <div class="w-full">
            <InputGroup>
              <InputGroupAddon> A </InputGroupAddon>
              <FloatLabel variant="on">
                <InputText id="lastName" name="lastName" />
                <label for="lastName">{{ $t('connexion.register.lastName') }}</label>
              </FloatLabel>
            </InputGroup>
            <Message
              v-if="$form.lastName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.lastName.error.message }}</Message
            >
          </div>
          <div class="w-full mt-5 md:mt-0">
            <InputGroup>
              <InputGroupAddon> a </InputGroupAddon>
              <FloatLabel variant="on">
                <InputText id="firstName" name="firstName" />
                <label for="firstName">{{ $t('connexion.register.firstName') }}</label>
              </FloatLabel>
            </InputGroup>
            <Message
              v-if="$form.firstName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.firstName.error.message }}</Message
            >
          </div>
        </div>
        <div class="flex items-center mt-5">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <FloatLabel variant="on">
              <InputText id="username" name="username" />
              <label for="username">{{ $t('connexion.register.username') }}</label>
            </FloatLabel>
          </InputGroup>
          <Badge value="?" class="ml-3" v-tooltip.top="$t('connexion.register.usernameHelp')">
          </Badge>
        </div>
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
          $form.username.error.message
        }}</Message>
        <InputGroup class="mt-5">
          <InputGroupAddon> @ </InputGroupAddon>
          <FloatLabel variant="on">
            <InputText inputmode="email" id="email" name="email" :feedback="false" />
            <label for="email">{{ $t('connexion.register.email') }}</label>
          </FloatLabel>
        </InputGroup>
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
          $form.email.error.message
        }}</Message>
        <InputGroup class="mt-5">
          <InputGroupAddon> # </InputGroupAddon>
          <FloatLabel variant="on">
            <Password id="password" name="password" :feedback="false" />
            <label for="password">{{ $t('connexion.register.password') }}</label>
          </FloatLabel>
        </InputGroup>
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
          $form.password.error.message
        }}</Message>
        <InputGroup class="mt-5">
          <InputGroupAddon> # </InputGroupAddon>
          <FloatLabel variant="on">
            <Password id="confirmPassword" name="confirmPassword" :feedback="false" />
            <label for="confirmPassword">{{ $t('connexion.register.confirmPassword') }}</label>
          </FloatLabel>
        </InputGroup>
        <Message
          v-if="$form.confirmPassword?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.confirmPassword.error.message }}</Message
        >
        <Button type="submit" class="mt-5 md:self-end md:px-6!"
          >{{ $t('connexion.register.submit') }} <i class="pi pi-arrow-right"></i
        ></Button>
      </Form>
      <div class="text-center">
        {{ $t('connexion.register.alreadyAccount') }}
        <RouterLink to="/login" class="underline">{{
          $t('connexion.register.loginLink')
        }}</RouterLink>
      </div>
    </div>
  </div>
  <Toast position="top-right" />
</template>

<style scoped>
.continuewith > * {
  margin-top: 10px;
}
</style>
