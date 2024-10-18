<template>
    <transition name="fade">
        <div
            v-if="visible"
            @click.self="close"
            class="mobile-search"
        >
            <label class="mobile-search__label">
                <input
                    v-model="query"
                    @input="searchMovies"
                    type="text"
                    placeholder="Search"
                    class="mobile-search__input"
                >

                <svg v-if="results.length > 0" class="mobile-search__clear" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637
                              16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855
                              12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                          fill="white" fill-opacity="0.5"/>
                </svg>
            </label>

            <div
                v-if="results.length > 0"
                class="mobile-search__result"
            >
                <ul class="mobile-search__result-list">
                    <li
                        v-for="movie in results"
                        :key="movie.id"
                        class="mobile-search__result-item"
                    >
                        <router-link
                            :to="`/movie/${movie.id}`"
                            @click="clearSearch"
                            class="mobile-search__result-link"
                        >
                            <img
                                :src="movie.posterUrl"
                                :alt="movie.title"
                                class="img-responsive mobile-search__result-link__img"
                            />
                            <div class="mobile-search__result-link__inner">
                                <div class="mobile-search__result-link__info">
                                    <Rating :rating="movie.tmdbRating" />
                                    <div class="date">{{ movie.releaseYear }}</div>
                                    <div class="genre">{{ movie.genres.join(', ') }}</div>
                                </div>

                                <div class="time">{{ formatFilmTime(parseInt(movie.runtime)) }}</div>

                                <h4>{{ movie.title }}</h4>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useMoviesStore} from '@/stores/useMoviesStore';
import type {Movie} from '@/types/movie';
import {formatFilmTime} from "@/utils/formatFilmTime";
import Rating from "@/components/common/Rating.vue";

defineProps<{
    visible: boolean;
}>();

const emit = defineEmits(['close']);

const query = ref('');
const results = ref<Movie[]>([]);
const moviesStore = useMoviesStore();

const searchMovies = async () => {
    if (query.value.trim() === '') {
        results.value = [];
        return;
    }
    const allResults = await moviesStore.searchMovies(query.value);
    results.value = allResults.slice(0, 5);
};

const clearSearch = () => {
    query.value = '';
    results.value = [];
};

const close = () => {
    emit('close');
};
</script>

<style scoped lang="scss">
.mobile-search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 16px 20px;
    background-color: rgba(0, 0, 0, .50);
    z-index: 100;
    opacity: 1;
    transition: opacity 0.5s ease;

    &__label {
        position: relative;
    }

    &__input {
        width: 100%;
        height: 56px;
        padding: 16px 16px 16px 52px;
        font-size: 18px;
        color: #fff;
        outline: none;
        border: none;
        border-radius: 8px;
        background-color: var(--background-secondary);
        background-image: url("@/assets/images/icons/icon-search.svg");
        background-repeat: no-repeat;
        background-size: 24px 24px;
        background-position: 16px center;
    }

    &__clear {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        z-index: 10;
    }

    &__result {
        width: 100%;
        padding: 24px 20px;
        margin: 8px 0 0;
        border-radius: 8px;
        background: var(--background-secondary, #393B3C);

        &-list {
            display: flex;
            padding: 0;
            margin: 0;
            list-style: none;
            overflow: auto;
        }

        &-item {
            min-width: 220px;
            flex-shrink: 0;
            padding: 0 0 12px;
            margin: 0 16px 0 0;



            &:last-child {
                margin-right: 0;
            }
        }

        &-link {
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: #fff;

            &__img {
                width: 158px;
                height: 206px;
                margin: 0 0 16px;
                object-fit: cover;
                object-position: center;
            }

            &__info {
                display: flex;
                align-items: center;
                white-space: nowrap;
                margin: 0 0 12px;

                .rating {
                    padding: 4px 8px 4px 22px;
                    font-size: 12px;
                    line-height: 1;
                    background-size: 10px 10px;
                    background-position: 8px center;
                }

                .date,
                .genre {
                    margin: 0 0 0 12px;
                    font-size: 14px;
                    line-height: 1.4;
                    color: var(--content-secondary);
                }
            }

            .time {
                margin: 0 0 8px;
                font-size: 14px;
                line-height: 1.4;
                color: var(--content-secondary);
            }
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>