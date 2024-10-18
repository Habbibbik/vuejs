<template>
    <div class="page">
        <HeroBlock
            v-if="movie"
            :movie="movie"
            :random-movie="false"
            :link-movie="false"
            :movie-page="true"
        />
        <MovieDetails :movie="movie" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieById } from '@/api/movies';
import type { Movie} from "@/types/movie";
import MovieDetails from "@/components/MovieDetails.vue";
import HeroBlock from "@/components/HeroBlock.vue";

const route = useRoute();
const movie = ref<Movie | null>(null);

const fetchMovie = async () => {
    const movieId = Number(route.params.id);
    if (!isNaN(movieId)) {
        movie.value = await getMovieById(movieId);
    }
};

onMounted(fetchMovie);

watch(() => route.params.id, fetchMovie);
</script>
