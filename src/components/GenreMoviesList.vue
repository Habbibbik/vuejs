<template>
    <div class="movies">
        <div class="container">
            <h1 class="movies__title">{{ genre }}</h1>

            <div class="movies__list">
                <router-link :to="`/movie/${movie.id}`"
                    v-for="movie in movies"
                    :key="movie.id"
                    class="movies__item"
                >
                    <img
                        :src="movie.posterUrl"
                        :alt="movie.title"
                        class="img-responsive movies__item-img"
                    />
                </router-link>
            </div>

            <button
                @click="loadMore"
                class="btn movies__btn"
            >
                Show more
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMoviesStore } from '@/stores/useMoviesStore';
import type { Movie } from '@/types/movie';

const route = useRoute();
const genre = route.params.genre as string;
const moviesStore = useMoviesStore();

const movies = ref<Movie[]>([]);
const hasMore = ref(true);
const loading = ref(false);

const fetchMoviesByGenre = async (reset = false) => {
    loading.value = true;
    await moviesStore.fetchMovies({ genre }, reset);
    movies.value = moviesStore.movies;
    hasMore.value = moviesStore.hasMore;
    loading.value = false;
};

const loadMore = async () => {
    await fetchMoviesByGenre();
};

onMounted(async () => {
    await fetchMoviesByGenre(true);
});
</script>

<style scoped lang="scss">
.movies {
    padding: 40px 0 120px;

    &__title {

        &::first-letter {
            text-transform: uppercase;
        }
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 64px 40px;
        margin: 0 0 64px;
    }

    &__item {
        width: calc(100%/5 - 32px);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);
        overflow: hidden;

        &-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            transform: translateZ(0);
            transition: transform .6s linear;
        }

        &:hover {

            .movies__item-img {
                transform: scale(1.1);
            }
        }
    }

    &__btn {
        margin: 0 auto;
    }
    
    @media only screen and (max-width: 1024px) {
        padding-top: 24px;
        padding-bottom: 40px;

        &__list {
            gap: 32px 20px;
        }

        &__item {
            width: calc(50% - 10px);
        }
    }

    @media only screen and (max-width: 768px) {

        &__list {
            gap: 24px 0;
        }

        &__item {
            width: 100%;
        }
    }
}
</style>