<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Button, Password } from 'primevue';
import { Form } from '@primevue/forms';
import z from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { reactive } from 'vue';

const initialValues = reactive({
    email: '',
    password: ''
});

const resolver = zodResolver(z.object({
    email: z.string().email("Email Invalide"),
    password: z.string().min(1, "Veuillez rentrer un mot de passe.")
}));

function onFormSubmit({ valid }: { valid: boolean }) {
    if (valid){
        console.log("Submitted");
    }
}

</script>

<template>
    <div class="w-full h-full flex items-center justify-center py-12">
        <div class="shadow-xl rounded w-[90%] md:w-[500px] md:min-h-3/4 p-12 flex flex-col justify-between">
            <h2 class="text-3xl font-semibold text-center">Connexion</h2>
            <Form v-slot="$form" :initialValues :resolver="resolver" @submit="onFormSubmit"
                class="flex flex-col login-inputs my-5">
                <InputGroup>
                    <InputGroupAddon>
                        @
                    </InputGroupAddon>
                    <FloatLabel variant="on">
                        <InputText id="email" name="email" inputmode="email" />
                        <label for="email">E-Mail</label>
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
                        <label for="password">Mot de passe</label>
                    </FloatLabel>
                </InputGroup>
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
                            $form.password.error.message }}</Message>
                <Button class="md:self-end md:px-6! mt-5" type="submit">Connexion <i class="pi pi-arrow-right"></i></Button>
            </Form>
            <div class="text-center">
                Vous n'avez pas de compte ? <RouterLink to="/register" class="underline">Inscription</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>

.continuewith>* {
    margin-top: 10px
}
</style>
