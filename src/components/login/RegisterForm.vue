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
  LastName: '',
  FirstName: '',
  Username: '',
  Email: '',
  Password: '',
  ConfirmPassword: '',
})

const resolver = zodResolver(
  z
    .object({
      LastName: z.string().optional().or(z.literal('')),
      FirstName: z.string().optional().or(z.literal('')),
      Username: z.string().min(1, t('connexion.register.error.usernameRequired')),
      Email: z.string().email(t('connexion.register.error.emailInvalid')),
      Password: z.string().min(8, t('connexion.register.error.passwordMin')),
      ConfirmPassword: z.string(),
    })
    .superRefine((val, ctx) => {
      if (val.ConfirmPassword !== val.Password) {
        ctx.addIssue({
          code: 'custom',
          message: t('connexion.register.error.passwordsNotMatch'),
          path: ['ConfirmPassword'],
        })
      }
    }),
)

function onFormSubmit(event: FormSubmitEvent<RegisterRequest>) {
  const { valid, values } = event

  if (valid) {
    const registerRequest: RegisterRequest = {
      LastName: values.LastName,
      FirstName: values.FirstName,
      Username: values.Username,
      Email: values.Email,
      Password: values.Password,
      ConfirmPassword: values.ConfirmPassword,
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
                <InputText id="LastName" name="LastName" />
                <label for="LastName">{{ $t('connexion.register.lastName') }}</label>
              </FloatLabel>
            </InputGroup>
            <Message
              v-if="$form.LastName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.LastName.error.message }}</Message
            >
          </div>
          <div class="w-full mt-5 md:mt-0">
            <InputGroup>
              <InputGroupAddon> a </InputGroupAddon>
              <FloatLabel variant="on">
                <InputText id="firstName" name="FirstName" />
                <label for="FirstName">{{ $t('connexion.register.firstName') }}</label>
              </FloatLabel>
            </InputGroup>
            <Message
              v-if="$form.FirstName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.FirstName.error.message }}</Message
            >
          </div>
        </div>
        <div class="flex items-center mt-5">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <FloatLabel variant="on">
              <InputText id="Username" name="Username" />
              <label for="Username">{{ $t('connexion.register.username') }}</label>
            </FloatLabel>
          </InputGroup>
          <Badge value="?" class="ml-3" v-tooltip.top="$t('connexion.register.usernameHelp')">
          </Badge>
        </div>
        <Message v-if="$form.Username?.invalid" severity="error" size="small" variant="simple">{{
          $form.Username.error.message
        }}</Message>
        <InputGroup class="mt-5">
          <InputGroupAddon> @ </InputGroupAddon>
          <FloatLabel variant="on">
            <InputText inputmode="Email" id="Email" name="Email" :feedback="false" />
            <label for="Email">{{ $t('connexion.register.email') }}</label>
          </FloatLabel>
        </InputGroup>
        <Message v-if="$form.Email?.invalid" severity="error" size="small" variant="simple">{{
          $form.Email.error.message
        }}</Message>
        <InputGroup class="mt-5">
          <InputGroupAddon> # </InputGroupAddon>
          <FloatLabel variant="on">
            <Password id="Password" name="Password" :feedback="false" />
            <label for="Password">{{ $t('connexion.register.password') }}</label>
          </FloatLabel>
        </InputGroup>
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
          $form.password.error.message
        }}</Message>
        <InputGroup class="mt-5">
          <InputGroupAddon> # </InputGroupAddon>
          <FloatLabel variant="on">
            <Password id="ConfirmPassword" name="ConfirmPassword" :feedback="false" />
            <label for="ConfirmPassword">{{ $t('connexion.register.confirmPassword') }}</label>
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
