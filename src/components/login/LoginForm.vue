<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Button, Password } from 'primevue';
import { Form } from '@primevue/forms';
import z from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n'
import { login } from '@/controllers/Login';
import type { LoginRequest } from '@/models/Login';
import { useToast } from 'primevue/usetoast';

const { t } = useI18n()
const toast = useToast()
const initialValues = reactive({
    email: '',
    password: ''
});

const resolver = zodResolver(z.object({
    email: z.string().email(t("connexion.login.invalidEmail")),
    password: z.string().min(1, t("connexion.login.invalidPassword"))
}));

function onFormSubmit({ valid, values }: { valid: boolean, values: any }) {
    if (valid) {
        const loginRequest : LoginRequest = {
            email: values.email,
            password: values.password,
        };
        login(loginRequest).then(() => {
            router.push('/')
        }).catch((error: Error) => {
            toast.add({
                severity: 'error',
                summary: t('connexion.register.error.toastTitle'),
                detail: error.message || t('connexion.register.error.toastMessage'),
                life: 5000
            });
        });
    }
}

</script>

<template>
    <div class="w-full h-full flex items-center justify-center py-12">
        <div class="shadow-xl rounded w-[90%] md:w-[500px] md:min-h-3/4 p-12 flex flex-col justify-between">
            <h2 class="text-3xl font-semibold text-center">{{ t("connexion.login.title") }}</h2>
            <Form v-slot="$form" :initialValues :resolver="resolver" @submit="onFormSubmit"
                class="flex flex-col login-inputs my-5">
                <InputGroup>
                    <InputGroupAddon>
                        @
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <InputText id="email" name="email" inputmode="email" />
                        <label for="email">{{ t("connexion.login.email") }}</label>
                    </FloatLabel>
                </InputGroup>
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                            $form.email.error.message }}</Message>
                <InputGroup class="mt-5">
                    <InputGroupAddon>
                        #
                    </InputGroupAddon>

                    <FloatLabel variant="on">
                        <Password id="password" name="password" :feedback="false" />
                        <label for="password">{{ t("connexion.login.password") }}</label>
                    </FloatLabel>
                </InputGroup>
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
                            $form.password.error.message }}</Message>
                <Button class="md:self-end md:px-6! mt-5" type="submit">{{ t("connexion.login.title") }} <i class="pi pi-arrow-right"></i></Button>
            </Form>
            <div class="text-center">
                {{ t("connexion.login.noAccount") }} <RouterLink to="/register" class="underline">{{ t("connexion.register.title") }}</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>

.continuewith>* {
    margin-top: 10px
}
</style>
