// src/utils/useScreenSize.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useScreenSize() {
    const screenWidth = ref(window.innerWidth);

    const updateScreenWidth = () => {
        screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
        window.addEventListener('resize', updateScreenWidth);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateScreenWidth);
    });

    return { screenWidth };
}
