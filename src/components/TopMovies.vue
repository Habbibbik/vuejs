<template>
    <div class="top-movies">
        <div class="container">
            <h2 class="top-movies__title">Top 10 films</h2>

            <div class="top-movies__list">
                <router-link v-for="(movie, index) in top10Movies" :key="movie.id" :to="`/movie/${movie.id}`" class="top-movies__item">
                    <div class="top-movies__item-number">{{ index + 1 }}</div>
                    <img :src="movie.posterUrl" :alt="movie.title" class="top-movies__item-img img-responsive"/>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getTop10Movies } from '@/api/movies';
import type { Movie} from "@/types/movie";

const top10Movies = ref<Movie[]>([]);
const router = useRouter();

const fetchTop10Movies = async () => {
    top10Movies.value = await getTop10Movies();
};

const goToMovie = (movieId: number) => {
    router.push({ name: 'MovieView', params: { id: movieId } });
};

onMounted(fetchTop10Movies);
</script>

<style lang="scss" scoped>
.top-movies {
    padding: 40px 0 120px;

    &__list {
        display: flex;
        flex-wrap: wrap;
    }

    &__item {
        position: relative;
        width: calc(100% / 5 - 32px);
        margin: 0 40px 64px 0;

        &-number {
            position: absolute;
            top: -12px;
            left: -12px;
            padding: 8px 24px;
            font-size: 24px;
            font-weight: 700;
            color: var(--background-brand-active);
            border-radius: 50px;
            background: var(--background-white);
        }

        &-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.25);
            box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);
        }

        &:nth-child(5n) {
            margin-right: 0;
        }

        &:nth-child(n+6) {
            margin-bottom: 0;
        }
    }

    @media only screen and (max-width: 1024px) {
        padding-top: 32px;
        padding-bottom: 32px;

        .container {
            padding-right: 0;
            padding-left: 0;
        }

        &__title {
            padding-right: 20px;
            padding-left: 20px;
            margin-bottom: 0;
        }

        &__list {
            flex-wrap: nowrap;
            padding: 40px 20px 32px;
            overflow: auto;
        }

        &__item {
            width: 224px;
            flex-shrink: 0;
            margin-right: 40px;
            margin-bottom: 0;
        }
    }
}
</style>
