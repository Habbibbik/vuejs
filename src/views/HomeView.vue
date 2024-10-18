<template>
    <HeroBlock
        :movie="movie"
        :random-movie="true"
        :link-movie="true"
        :movie-page="false"
    />
    <TopMovies/>
</template>

<script setup lang="ts">
import {ref} from "vue";
import TopMovies from "@/components/TopMovies.vue";
import HeroBlock from "@/components/HeroBlock.vue";
import type {Movie} from "@/types/movie";

const movie = ref<Movie | null>(null);
</script>


