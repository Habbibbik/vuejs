<template>
    <div v-if="movie" class="details">
        <div class="container">
            <h2 class="details__title">About the movie</h2>

            <ul class="details__list">
                <li v-if="movie.language" class="details__list-item">
                    <div class="title">
                        <span>Original language</span>
                    </div>
                    <div class="desc">{{ getLanguageName(movie.language) }}</div>
                </li>
                <li v-if="movie.budget" class="details__list-item">
                    <div class="title">
                        <span>Budget</span>
                    </div>
                    <div class="desc">{{ formatCurrency(movie.budget) }}</div>
                </li>
                <li v-if="movie.revenue" class="details__list-item">
                    <div class="title">
                        <span>Revenue</span>
                    </div>
                    <div class="desc">{{ formatCurrency(movie.revenue) }}</div>
                </li>
                <li v-if="movie.director" class="details__list-item">
                    <div class="title">
                        <span>Director</span>
                    </div>
                    <div class="desc">{{ movie.director }}</div>
                </li>
                <li v-if="movie.production" class="details__list-item">
                    <div class="title">
                        <span>Production</span>
                    </div>
                    <div class="desc">{{ movie.production }}</div>
                </li>
                <li v-if="movie.awardsSummary" class="details__list-item">
                    <div class="title">
                        <span>Awards</span>
                    </div>
                    <div class="desc">{{ movie.awardsSummary }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {Movie} from "@/types/movie";
import {formatCurrency} from "@/utils/formatCurrency";
import {getLanguageName} from "@/utils/languageName";

defineProps<{
    movie: Movie | null;
}>();

</script>

<style scoped lang="scss">
.details {
    padding: 40px 0 120px;

    &__list {
        width: fit-content;
        padding: 0;
        margin: 0;
        list-style: none;

        &-item {
            display: flex;
            align-items: center;
            margin: 0 0 24px;
            font-size: 18px;

            .title {
                position: relative;
                width: 244px;

                span {
                    position: relative;
                    padding: 0 8px 0 0;
                    background-color: var(--background-black);
                    z-index: 1;
                }

                &::before {
                    content: '';
                    position: absolute;
                    bottom: 6px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    border-bottom: 1px dotted #fff;
                    z-index: -1;
                }
            }

            .desc {
                padding: 0 0 0 8px;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    
    @media only screen and (max-width: 1024px) {
        padding-top: 32px;
        padding-bottom: 32px;

        &__list {

            &-item {
                flex-direction: column;
                align-items: flex-start;
                margin-bottom: 12px;

                .title {
                    width: auto;
                    margin-bottom: 4px;
                    font-size: 14px;
                    line-height: 1.42;
                    color: var(--content-disabled);

                    &::before {
                        content: none;
                    }
                }

                .desc {
                    padding-left: 0;
                }
            }
        }
    }
}
</style>