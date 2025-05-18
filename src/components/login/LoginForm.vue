<script lang="ts">
import { RouterLink } from 'vue-router';
import { Button } from 'primevue';

</script>

<template>
    <div class="w-full h-full flex items-center justify-center py-12">
        <div class="shadow-xl md:w-[500px] md:h-full p-12 flex flex-col justify-between">
            <h2 class="text-3xl font-semibold text-center">Connexion</h2>
            <div class="flex flex-col padme">
                <InputGroup>
                    <InputGroupAddon>
                        @
                    </InputGroupAddon>
                    <InputText v-model="text1" placeholder="your-email@mail.com" />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon>
                        #
                    </InputGroupAddon>
                    <InputText v-model="text1" placeholder="Password" />
                </InputGroup>
                <Button class="md:self-end md:px-6!">Connexion</Button>
            </div>
            <div class="flex flex-col continuewith">
                <ContinueWith service="facebook" />
                <ContinueWith service="google" />
                <ContinueWith service="apple" />
            </div>
            <div class="text-center">
                Vous n'avez pas de compte ? <RouterLink to="/register">Inscription</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.padme>* {
    margin-top: 20px;
}
.continuewith>*{
    margin-top: 10px
}
</style>
