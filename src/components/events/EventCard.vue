<template>
    <div class="event">
        <div class="image">
            <img src="https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Bahrain"/>
        </div>
        <span class="location">Paris</span>
        <span class="eventname">Nom de l'évènement</span>
        <span class="datetime">20/05/2025 10:40</span>
    </div>
</template>

<style lang="css" scoped>
    .event {
        display: flex;
        flex-direction: column;
        border-radius: 3%;
        box-shadow: 0px 0px 12px 0px rgba(122, 122, 122, 0.5);
        padding: 1%;
    }

    .event .location, .event .datetime {
        color: gray
    }

    .event:hover img {
        transform: scale(1.2);
        transition: .5s ease;
    }

    .image {
        overflow: hidden;
        border-radius: 10%;
        height: 200px;
        width: 200px;
    }

    .image img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
</style>