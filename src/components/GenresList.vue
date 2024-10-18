<template>
    <div class="genres">
        <div class="container">
            <h1 class="genres__title">Film genres</h1>

            <div class="genres__list">
                <router-link
                    :to="`/genre/${genre.name}`"
                    v-for="genre in genres"
                    :key="genre.name"
                    class="genres__item"
                >
                    <img
                        :src="genre.image"
                        :alt="genre.name"
                        class="img-responsive genres__item-img"
                    >
                    <div class="genres__item-inner">
                        <h3 class="genres__item-name">{{ genre.name }}</h3>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGenresStore } from '@/stores/useGenresStore';
import type { Genre } from '@/utils/genres';

const genresStore = useGenresStore();

const genres = ref<Genre[]>([]);

const fetchGenres = async () => {
    await genresStore.fetchGenres();
    genres.value = genresStore.genres;
};

onMounted(async () => {
    await fetchGenres();
});
</script>

<style scoped lang="scss">
.genres {
    padding: 40px 0 120px;

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 64px 40px;
    }

    &__item {
        width: calc(25% - 30px);
        text-decoration: none;
        color: #fff;
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.25);
        background: var(--background-black);
        box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);
        overflow: hidden;

        &-img {
            width: 100%;
            height: 220px;
            object-position: center;
            object-fit: cover;
            transform: translateZ(0);
            transform-origin: bottom;
            transition: transform .6s linear;
        }

        &-inner {
            padding: 22px 24px 30px;
            text-align: center;
        }

        &-name {
            font-size: 24px;
            font-weight: 700;

            &::first-letter {
                text-transform: uppercase;
            }
        }

        &:hover {

            .genres__item-img {
                transform: scale(1.1);
            }
        }
    }
    
    @media only screen and (max-width: 1024px) {
        padding-top: 24px;
        padding-bottom: 40px;

        &__list {
            gap: 32px 24px;
        }

        &__item {
            width: calc(50% - 12px);
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