<template>
    <div v-if="movieUrl" class="trailer">
        <iframe
            :src="movieUrl"
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps<{
    movieUrl: string;
}>();

</script>

<style scoped lang="scss">
.trailer {
    position: relative;
    width: 960px;
    height: 540px;
    border: 1px solid var(--content-disabled);
    background-color: var(--background-secondary);

    .iframe {
        width: 100%;
        height: 100%;
    }
    
    @media only screen and (max-width: 1024px) {
        width: 100%;
        height: 220px;

        @media (orientation: landscape) {
            height: 100%;
        }
    }
}
</style>