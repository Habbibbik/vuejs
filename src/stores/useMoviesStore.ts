import {defineStore} from 'pinia';
import {ref} from 'vue';
import {getMovies} from '@/api/movies';
import type {Movie} from '@/types/movie';

export const useMoviesStore = defineStore('movies', () => {
    const movies = ref<Movie[]>([]);
    const page = ref(1);
    const hasMore = ref(true);

    const fetchMovies = async (filters: Record<string, any>, reset = false) => {
        if (reset) {
            page.value = 1;
            movies.value = [];
            hasMore.value = true;
        }

        const response = await getMovies({ ...filters, count: 10, page: page.value });
        if (response.length < 10) {
            hasMore.value = false;
        }
        movies.value.push(...response);
        page.value += 1;
    };

    const searchMovies = async (query: string) => {
        if (!query) return [];
        return await getMovies({title: query});
    };

    return { movies, fetchMovies, hasMore, searchMovies };
});
