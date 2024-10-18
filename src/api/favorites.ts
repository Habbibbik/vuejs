import axios from 'axios';
import type { Movie } from '@/types/movie';
import type { User } from '@/types/user';
import type { FavoritesBody } from '@/types/favoritesBody';

const API_BASE_URL = 'https://cinemaguide.skillbox.cc/';

const favoritesApi = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const getFavorites = async (): Promise<Movie[]> => {
    const response = await favoritesApi.get<Movie[]>('/favorites');
    return response.data;
};

export const addFavorite = async (data: FavoritesBody): Promise<User> => {
    const formData = new URLSearchParams();
    formData.append('id', data.id.toString());  // Преобразование ID в строку
    const response = await favoritesApi.post<User>('/favorites', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.data;
};

export const removeFavorite = async (movieId: number): Promise<User> => {
    const response = await favoritesApi.delete<User>(`/favorites/${movieId}`);
    return response.data;
};
