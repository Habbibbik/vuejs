<template>
    <div v-if="movie" class="hero">
        <div class="wrapper">
            <div class="container">
                <div class="hero__block">
                    <div class="hero__head">
                        <Rating :rating="movie.tmdbRating" />
                        <div class="hero__release">{{ movie.releaseYear }}</div>
                        <div class="hero__genres">{{ movie.genres.join(', ') }}</div>
                        <div class="hero__runtime">{{ formatRuntime(parseInt(movie.runtime)) }}</div>
                    </div>

                    <h1 class="hero__title">{{ movie.title }}</h1>
                    <p class="hero__desc">{{ movie.plot }}</p>

                    <div class="hero__actions" :class="{ page: moviePage }">
                        <button @click="showTrailer = true" class="btn">Trailer</button>
                        <router-link v-if="linkMovie" :to="`/movie/${movie.id}`" class="btn btn--black">About
                        </router-link>
                        <button
                            @click="handleFavorite"
                            class="btn btn--black btn--round hero__favorite"
                            :class="{ added: isFavorite }"
                        >
                            <svg v-if="isFavorite" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="on=true">
                                    <path id="Vector"
                                          d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"
                                          fill="#B4A9FF"/>
                                </g>
                            </svg>

                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <path
                                    d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5
                                3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955
                                 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241
                                 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759
                                 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955
                                 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389
                                 18.9729 12.6354 18.7919 12.9339 18.6038Z"
                                    fill="white"/>
                            </svg>
                        </button>
                        <button v-if="randomMovie" @click="fetchRandomMovie"
                                class="btn btn--black btn--round hero__random">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <path
                                    d="M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762
                                3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20
                                16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443
                                16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22
                                17.5228 22 12H20Z"
                                    fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="hero__background" :style="{ backgroundImage: `url(${movie.posterUrl})` }"></div>
    </div>

    <Modal :visible="showTrailer" :modal-trailer="true" @close="showTrailer = false">
        <TrailerModal v-if="movie?.trailerUrl" :movie-url="getEmbedUrl(movie.trailerUrl)"/>
    </Modal>

    <Modal :visible="showAuthModal" :modal-trailer="false" @close="showAuthModal = false">
        <AuthModal :visible="showAuthModal" @close="showAuthModal = false"/>
    </Modal>
</template>

<script setup lang="ts">
import {defineProps, ref, onMounted, watch} from 'vue';
import type {Movie} from "@/types/movie";
import {getRandomMovie} from '@/api/movies';
import {useAuthStore} from '@/stores/useAuthStore';
import {getFavorites} from '@/api/favorites';
import Modal from "@/components/common/modal/Modal.vue";
import TrailerModal from "@/components/common/modal/TrailerModal.vue";
import AuthModal from "@/components/common/modal/AuthModal.vue";
import Rating from "@/components/common/Rating.vue";

const props = defineProps<{
    movie: Movie | null,
    randomMovie: boolean,
    linkMovie: boolean,
    moviePage: boolean,
}>();

const movie = ref<Movie | null>(props.movie);
const showTrailer = ref(false);
const showAuthModal = ref(false);
const authStore = useAuthStore();
const isFavorite = ref(false);

const loadFavorites = async () => {
    if (authStore.isAuthenticated) {
        const favorites = await getFavorites();
        if (movie.value) {
            isFavorite.value = favorites.some(fav => fav.id === movie.value?.id);
        }
    } else {
        isFavorite.value = false;
    }
};

const checkIsFavorite = async () => {
    await loadFavorites();
};

onMounted(() => {
    if (movie.value) {
        checkIsFavorite();
    }
});

watch(() => props.movie, async (newMovie) => {
    movie.value = newMovie;
    if (newMovie) {
        await checkIsFavorite();
    }
});

const formatRuntime = (runtime: number): string => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
};

const fetchRandomMovie = async () => {
    movie.value = await getRandomMovie();
    if (movie.value) {
        await checkIsFavorite();
    }
};

const getEmbedUrl = (url: string): string => {
    const videoId = new URL(url).searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
};

const handleFavorite = async () => {
    if (!authStore.isAuthenticated) {
        showAuthModal.value = true;
    } else {
        const movieId = movie.value?.id.toString() || '';
        if (isFavorite.value) {
            await authStore.removeFromFavorites(movieId);
        } else {
            await authStore.addToFavorites(movieId);
        }
        await checkIsFavorite();
    }
};

if (props.randomMovie) {
    onMounted(fetchRandomMovie);
}
</script>

<style scoped lang="scss">
.hero {
    position: relative;
    min-height: calc(100vh - 96px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 110px 0 120px;

    &__block {
        max-width: 600px;
        display: flex;
        flex-direction: column;
    }

    &__head {
        display: flex;
        align-items: center;
        margin: 0 0 16px;
    }

    &__release,
    &__genres,
    &__runtime {
        margin: 0 0 0 16px;
        font-size: 18px;
        color: var(--content-secondary);
    }

    &__runtime {
        white-space: nowrap;
    }

    &__random,
    &__favorite {

        svg {

            path {
                transition: fill .4s ease-in-out;
            }
        }

        &:hover {

            svg {
                path {
                    fill: var(--content-active);
                }
            }
        }
    }

    &__title {
        margin: 0 0 16px;
    }

    &__desc {
        margin: 0 0 60px;
        font-size: 24px;
        color: var(--content-secondary);
    }

    &__actions {
        display: flex;
        align-items: center;

        .btn:not(:first-child) {
            margin: 0 0 0 16px;
        }
    }

    &__background {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 60%;
        height: 100%;
        background-color: lightgray;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        z-index: -1;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.50) 20.41%, rgba(0, 0, 0, 0.00) 100%);
        }
    }

    @media only screen and (max-width: 1200px) {
        padding-top: 40px;
        padding-bottom: 40px;

        &__title {
            font-size: 32px;
        }

        &__desc {
            margin-bottom: 32px;
            font-size: 20px;
        }
    }

    @media only screen and (max-width: 1024px) {
        min-height: unset;
        flex-direction: column-reverse;
        padding-top: 0;
        padding-bottom: 8px;

        &__background {
            position: static;
            width: 100%;
            height: 260px;
        }

        &__block {
            max-width: 100%;
            padding-top: 24px;
        }

        &__head {
            margin-bottom: 12px;
        }

        &__release,
        &__genres,
        &__runtime {
            font-size: 14px;
        }

        &__title {
            margin-bottom: 12px;
            font-size: 24px;
        }

        &__desc {
            font-size: 18px;
        }

        &__actions {
            flex-wrap: wrap;

            button,
            a {
                margin: 0 16px 16px 0 !important;

                &:first-child {
                    width: 100%;
                    max-width: 355px;
                }
            }

            &.page {

                button {

                    &:first-child {
                        width: auto;
                        margin-bottom: 0;
                    }
                }
            }
        }
    }

    @media only screen and (max-width: 576px) {
        &__actions {

            button {

                &:first-child {
                    margin-right: 0 !important;
                }
            }
        }
    }
}
</style>