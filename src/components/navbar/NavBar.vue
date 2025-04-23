<script setup lang="ts">
import NavbarActions from './NavbarActions.vue';
import NavbarLogo from './NavbarLogo.vue';
import NavbarSearch from './NavbarSearch.vue';
import NavbarUserActions from './NavbarUserActions.vue';


</script>

<template>
  <div class="navbar">
    <NavbarLogo />
    <NavbarActions />
    <NavbarSearch />
    <NavbarUserActions />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.navbar {
    margin: 1% 20%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: auto;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
