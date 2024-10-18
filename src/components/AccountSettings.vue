<template>
    <div class="settings">
        <div class="settings__item">
            <div class="settings__item-img">
                <span>{{ initials }}</span>
            </div>

            <div class="settings__item-inner">
                <div class="settings__item-info">Name</div>
                <div class="settings__item-title">{{ authStore.user?.name + ' ' + authStore.user?.surname }}</div>
            </div>
        </div>

        <div class="settings__item">
            <div class="settings__item-img">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
                        fill="white"/>
                </svg>
            </div>

            <div class="settings__item-inner">
                <div class="settings__item-info">Email</div>
                <div class="settings__item-title">{{ authStore.user?.email }}</div>
            </div>
        </div>

        <button
            @click="handleLogout"
            class="btn settings__btn"
        >
            Log out
        </button>
    </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from "@/stores/useAuthStore";
import { useToast } from 'vue-toast-notification';

const authStore = useAuthStore();

const isLoading = ref(false);
const router = useRouter();
const toast = useToast();

const handleLogout = async () => {
    isLoading.value = true;
    try {
        await authStore.logoutUser();
        toast.success('Successful logout!');
        await router.push('/');
    } catch (error) {
        toast.error('Error when logging out of the system: ' + (error as Error).message);
    } finally {
        isLoading.value = false;
    }
};

const initials = computed(() => {
    const name = authStore.user?.name || '';
    const surname = authStore.user?.surname || '';
    return `${name.charAt(0)}${surname.charAt(0)}`;
});
</script>

<style scoped lang="scss">
.settings {
    padding: 64px 0 160px;
    
    &__item {
        margin: 0 0 40px;
        display: flex;

        &-img {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin: 0 16px 0 0;
            border-radius: 30px;
            background: var(--content-disabled);

            span {
                font-size: 24px;
                font-weight: 700;
            }

            svg {
                width: 24px;
                height: 24px;
            }
        }

        &-info {
            margin: 0 0 4px;
            font-size: 18px;
        }

        &-title {
            font-size: 24px;
            font-weight: 700;
        }
    }
    
    @media only screen and (max-width: 1024px) {
        padding-top: 40px;
        padding-bottom: 148px;

        &__item {

            &-img {
                width: 48px;
                height: 48px;
            }

            &-info {
                color: var(--content-disabled);
                font-size: 14px;
            }

            &-title {
                font-size: 18px;
            }
        }

        &__btn {
            width: 100%;
        }
    }
}
</style>