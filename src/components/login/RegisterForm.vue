<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Badge, Button, FloatLabel, InputText, Password } from 'primevue';
import { Form } from '@primevue/forms';
import { reactive } from 'vue';
import { z } from "zod";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const initialValues = reactive({
    lastname: '',
    firstname: '',
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
});

const resolver = zodResolver(z.object({
    lastname: z.string().optional().or(z.literal("")),
    firstname: z.string().optional().or(z.literal("")),
    username: z.string().min(1, t('connexion.register.error.usernameRequired')),
    email: z.string().email(t('connexion.register.error.emailInvalid')),
    password: z.string().min(8, t('connexion.register.error.passwordMin')),
    confirmpassword: z.string()
}).superRefine((val, ctx) => {
    if (val.confirmpassword !== val.password) {
        ctx.addIssue({
            code: "custom",
            message: t('connexion.register.error.passwordsNotMatch'),
            path: ["confirmpassword"]
        })
    }
}))

function onFormSubmit({ valid }: { valid: boolean }) {
    if (valid) {
        console.log("Hello");
    }
}

</script>

<template>
    <div class="w-full h-full flex items-center justify-center py-12">
        <div class="shadow-xl rounded w-[90%] md:w-[800px] md:min-h-3/4 p-12 flex flex-col justify-between">
            <h2 class="text-3xl font-semibold text-center">{{ $t('connexion.register.title') }}</h2>
            <Form v-slot="$form" :initialValues :resolver="resolver" @submit="onFormSubmit"
                class="flex flex-col login-inputs my-5">
                <div class="md:grid md:grid-cols-2 md:gap-x-4">
                    <div class="w-full">
                        <InputGroup>
                            <InputGroupAddon>
                                A
                            </InputGroupAddon>
                            <FloatLabel variant="on">
                                <InputText id="lastname" name="lastname" />
                                <label for="lastname">{{ $t('connexion.register.lastname') }}</label>
                            </FloatLabel>

                        </InputGroup>
                        <Message v-if="$form.lastname?.invalid" severity="error" size="small" variant="simple">{{
                            $form.lastname.error.message }}</Message>
                    </div>
                    <div class="w-full mt-5 md:mt-0">
                        <InputGroup>
                            <InputGroupAddon>
                                a
                            </InputGroupAddon>
                            <FloatLabel variant="on">
                                <InputText id="firstname" name="firstname" />
                                <label for="firstname">{{ $t('connexion.register.firstname') }}</label>
                            </FloatLabel>

                        </InputGroup>
                        <Message v-if="$form.firstname?.invalid" severity="error" size="small" variant="simple">{{
                            $form.firstname.error.message }}</Message>
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
                    <Badge value="?" class="ml-3"
                        v-tooltip.top="$t('connexion.register.usernameHelp')">
                    </Badge>
                </div>
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
                    $form.username.error.message }}</Message>
                <InputGroup class="mt-5">
                    <InputGroupAddon>
                        @
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <InputText inputmode="email" id="email" name="email" :feedback="false" />
                        <label for="email">{{ $t('connexion.register.email') }}</label>
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
                        <label for="password">{{ $t('connexion.register.password') }}</label>
                    </FloatLabel>
                </InputGroup>
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
                    $form.password.error.message }}</Message>
                <InputGroup class="mt-5">
                    <InputGroupAddon>
                        #
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <Password id="confirmpassword" name="confirmpassword" :feedback="false" />
                        <label for="confirmpassword">{{ $t('connexion.register.confirmpassword') }}</label>
                    </FloatLabel>
                </InputGroup>
                <Message v-if="$form.confirmpassword?.invalid" severity="error" size="small" variant="simple">{{
                    $form.confirmpassword.error.message }}</Message>
                <Button type="submit" class="mt-5 md:self-end md:px-6!">{{ $t('connexion.register.submit') }} <i
                        class="pi pi-arrow-right"></i></Button>
            </Form>
            <div class="text-center">
                {{ $t('connexion.register.alreadyAccount') }} <RouterLink to="/login" class="underline">{{ $t('connexion.register.loginLink') }}</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.continuewith>* {
    margin-top: 10px
}
</style>
