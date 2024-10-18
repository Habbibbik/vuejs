<template>
    <div class="favorite">
        <div
            v-if="favorites.length > 0"
            class="favorite__list"
        >
            <div
                v-for="movie in favorites"
                :key="movie.id"
                class="favorite__item"
            >
                <router-link
                    :to="`/movie/${movie.id}`"
                    class="favorite__item-link"
                >
                    <img :src="movie.posterUrl" :alt="movie.title" class="img-responsive favorite__item-img" />
                </router-link>
                <div
                    @click="removeFromFavorites(movie.id)"
                    class="favorite__item-delete"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
                              fill="black"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFavorites, removeFavorite } from '@/api/favorites';
import type { Movie } from '@/types/movie';

const favorites = ref<Movie[]>([]);

const loadFavorites = async () => {
    favorites.value = await getFavorites();
};

const removeFromFavorites = async (movieId: number) => {
    await removeFavorite(movieId);
    await loadFavorites();
};

onMounted(loadFavorites);
</script>

<style scoped lang="scss">
.favorite {

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 64px 40px;
    }

    &__item {
        position: relative;
        width: calc(25% - 30px);
        text-decoration: none;
        color: #fff;
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.25);
        background: var(--background-black);
        box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);

        &-link {
            width: 100%;
            height: 100%;
            display: block;
        }

        &-img {
            width: 100%;
            height: 100%;
            object-position: center;
            object-fit: cover;
            border-radius: 24px;
        }

        &-delete {
            position: absolute;
            top: -20px;
            right: -20px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 30px;
            background: #fff;
            cursor: pointer;
            visibility: hidden;
            opacity: 0;
            transition: opacity .4s, visibility .4s;
        }

        &:hover {

            .favorite__item-delete {
                opacity: 1;
                visibility: visible;
            }
        }
    }
    
    @media only screen and (max-width: 1024px) {

        &__list {
            width: calc(100% + 40px);
            flex-wrap: nowrap;
            gap: 0 40px;
            padding: 40px 20px 68px;
            transform: translateX(-20px);
            overflow: auto;
        }

        &__item {
            width: 224px;
            flex-shrink: 0;

            &-delete {
                top: -16px;
                right: -16px;
                opacity: 1;
                visibility: visible;
            }
        }
    }
}
</style>