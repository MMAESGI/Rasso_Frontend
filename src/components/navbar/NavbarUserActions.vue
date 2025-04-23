<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import IconTooling from '../icons/IconTooling.vue';

const menu = useTemplateRef("menu")
const items = ref([
    {
        items: [
            {
                label: 'Login',
                icon: 'pi pi-login'
            },
            {
                label: 'Register',
                icon: 'pi pi-register'
            }
        ]
    }
])
function toggle(event : Event){
  menu.value?.toggle(event)
}

</script>

<template>
  <div class="navbar-user-actions">
    <span>FR</span>
    <span><IconTooling /></span>
    <span @click="toggle"><IconTooling /></span>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true"/> 
  </div>
</template>

<style scoped>
.navbar-user-actions {
    display: flex;
}

.navbar-user-actions > * {
  padding: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-user-actions > span:not(:last-child) {
    border-right: 1px solid grey;
}
</style>

<style>
#overlay_menu{
  background-color: white;
  padding: 7px;
  border : 1px solid grey;
  border-radius: 10px;
  --p-menu-item-padding: 5px;
}
</style>