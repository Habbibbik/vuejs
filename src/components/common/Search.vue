<template>
    <div class="search">
        <input
            class="search__input"
            type="text"
            placeholder="Search"
            v-model="query"
            @input="searchMovies"
        />
        <div v-if="results.length > 0" class="search__results">
            <ul class="search__results-list">
                <li v-for="movie in results" :key="movie.id" class="search__results-item">
                    <router-link :to="`/movie/${movie.id}`" @click="clearSearch" class="search__results-link">
                        <img :src="movie.posterUrl" :alt="movie.title"
                             class="img-responsive search__results-link__img"/>
                        <div class="search__results-link__inner">
                            <div class="search__results-link__info">
                                <Rating :rating="movie.tmdbRating" />
                                <div class="date">{{ movie.releaseYear }}</div>
                                <div class="genre">{{ movie.genres.join(', ') }}</div>
                            </div>
                            <h4>{{ movie.title }}</h4>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>

        <svg v-if="results.length > 0" class="search__clear" @click="clearSearch" width="24" height="24"
             viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                fill="white" fill-opacity="0.5"/>
        </svg>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useMoviesStore} from '@/stores/useMoviesStore';
import type {Movie} from '@/types/movie';
import Rating from "@/components/common/Rating.vue";

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
</script>

<style scoped lang="scss">
.search {
    position: relative;
    margin: 0 0 0 40px;

    &__input {
        width: 527px;
        height: 48px;
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

    &__results {
        position: absolute;
        top: 72px;
        left: 0;
        width: 100%;
        padding: 8px;
        background: var(--background-secondary);
        border-radius: 0 0 8px 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 3;

        &-list {
            padding: 0;
            margin: 0;
            list-style: none;
        }

        &-link {
            display: flex;
            padding: 20px 8px;
            text-decoration: none;
            color: #fff;
            border-radius: 6px;
            border: 1px solid transparent;
            transition: border-color .4s;

            &__img {
                width: 40px;
                height: 52px;
                flex-shrink: 0;
                margin: 0 16px 0 0;
                object-fit: cover;
                object-position: center;
            }

            &__inner {
                flex: 1;
            }

            &__info {
                display: flex;
                align-items: center;
                margin: 0 0 8px;

                .rating {
                    padding: 4px 8px 4px 22px;
                    font-size: 12px;
                    line-height: 1;
                    background-size: 10px 10px;
                    background-position: 8px center;
                }

                .date,
                .genre,
                .time {
                    margin: 0 0 0 12px;
                    color: var(--content-secondary);
                    font-size: 14px;
                    line-height: 1.42;
                }
            }

            &:hover {
                border-color: var(--content-disabled);
            }
        }
    }

    &__clear {
        position: absolute;
        top: 12px;
        right: 16px;
        z-index: 3;
        cursor: pointer;

        path {
            transition: all .4s;
        }

        &:hover {

            path {
                fill-opacity: 1;
            }
        }
    }
    
    @media only screen and (max-width: 1366px) {

        &__input {
            width: 420px;
        }
    }
}
</style>
