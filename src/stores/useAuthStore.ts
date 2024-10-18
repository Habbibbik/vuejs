import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login, logout, register, getProfile } from '@/api/auth';
import { addFavorite, removeFavorite } from '@/api/favorites';
import type { AuthInfo } from '@/types/authInfo';
import type { RegisterData } from '@/types/registerData';
import type { User } from '@/types/user';
import type { SuccessfulResult } from '@/types/successfulResult';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const isAuthenticated = ref(false);

    const loginUser = async (authInfo: AuthInfo): Promise<SuccessfulResult> => {
        const result = await login(authInfo);
        if (result.result) {
            user.value = await getProfile();
            isAuthenticated.value = true;
            localStorage.setItem('user', JSON.stringify(user.value));
        }
        return result;
    };

    const logoutUser = async () => {
        await logout();
        user.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('user');
    };

    const registerUser = async (registerData: RegisterData): Promise<SuccessfulResult> => {
        const result = await register(registerData);
        if (result.result) {
            user.value = await getProfile();
            isAuthenticated.value = true;
            localStorage.setItem('user', JSON.stringify(user.value));
        }
        return result;
    };

    const fetchProfile = async () => {
        user.value = await getProfile();
        isAuthenticated.value = true;
    };

    const loadUserFromStorage = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            user.value = JSON.parse(storedUser);
            isAuthenticated.value = true;
        }
    };

    const addToFavorites = async (movieId: string) => {
        if (user.value) {
            await addFavorite({ id: movieId });
            user.value.favorites.push(movieId);
            localStorage.setItem('user', JSON.stringify(user.value));
        }
    };

    const removeFromFavorites = async (movieId: string) => {
        if (user.value) {
            await removeFavorite(parseInt(movieId));
            user.value.favorites = user.value.favorites.filter(id => id !== movieId);
            localStorage.setItem('user', JSON.stringify(user.value));
        }
    };

    return { user, isAuthenticated, loginUser, logoutUser, registerUser, fetchProfile, loadUserFromStorage, addToFavorites, removeFromFavorites };
});
