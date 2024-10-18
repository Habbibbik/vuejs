import axios from 'axios';
import type {Movie} from "@/types/movie";

const API_BASE_URL = 'https://cinemaguide.skillbox.cc/';

const moviesApi = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const getMovies = async (params: Record<string, any>): Promise<Movie[]> => {
    const response = await moviesApi.get<Movie[]>('/movie', { params });
    return response.data;
};

export const getTop10Movies = async (): Promise<Movie[]> => {
    const response = await moviesApi.get<Movie[]>('/movie/top10');
    return response.data;
};

export const getGenres = async (): Promise<string[]> => {
    const response = await moviesApi.get<string[]>('/movie/genres');
    return response.data;
};

export const getMovieById = async (movieId: number): Promise<Movie> => {
    const response = await moviesApi.get<Movie>(`/movie/${movieId}`);
    return response.data;
};

export const getRandomMovie = async (): Promise<Movie> => {
    const response = await moviesApi.get<Movie>('/movie/random');
    return response.data;
};
