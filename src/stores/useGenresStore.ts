import {defineStore} from 'pinia';
import {ref} from 'vue';
import {getGenres} from '@/api/movies';
import {transformGenres} from '@/utils/genres';
import type {Genre} from "@/utils/genres";

export const useGenresStore = defineStore('genres', () => {
    const genres = ref<Genre[]>([]);

    const fetchGenres = async () => {
        const genreStrings = await getGenres();
        genres.value = transformGenres(genreStrings);
    };

    return {genres, fetchGenres};
});
