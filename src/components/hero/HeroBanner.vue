<script lang="ts">

</script>

<template>
    <div class="herobanner">
        <span class="herotitle">Evenement de quelque chose</span>
        <span class="herotext">Texte sur la herobanner qui est censé représenter un évenement ou un truc du genre</span>
    </div>
</template>

<style lang="css" scoped>
    .herobanner {
        width: 100%;
        height: 500px;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), no-repeat center url("https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Japan.jpg");
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
    }

    .herotitle {
        font-size: 2.5em;
    }
    .herotext {
        font-size: 1.5em;
    }
</style>