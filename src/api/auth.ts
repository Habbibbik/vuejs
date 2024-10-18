import axios from 'axios';
import type { AuthInfo } from "@/types/authInfo";
import type { RegisterData } from "@/types/registerData";
import type { SuccessfulResult } from "@/types/successfulResult";
import type { User } from "@/types/user";

const API_BASE_URL = 'https://cinemaguide.skillbox.cc/';

const authApi = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const login = async (data: AuthInfo): Promise<SuccessfulResult> => {
    const response = await authApi.post<SuccessfulResult>('/auth/login', data);
    return response.data;
};

export const logout = async (): Promise<SuccessfulResult> => {
    const response = await authApi.get<SuccessfulResult>('/auth/logout');
    return response.data;
};

export const register = async (data: RegisterData): Promise<SuccessfulResult> => {
    const response = await authApi.post<SuccessfulResult>('/user', data);
    return response.data;
};

export const getProfile = async (): Promise<User> => {
    const response = await authApi.get<User>('/profile');
    return response.data;
};
