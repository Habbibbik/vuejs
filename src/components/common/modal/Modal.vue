<template>
    <transition name="fade">
        <div
            v-if="visible"
            @click.self="close"
            class="modal"
            :class="{ 'modal--trailer': modalTrailer }"
        >
            <div class="modal__content">
                <button class="modal__close" @click="close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072
                    4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001
                    13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
                            fill="black"/>
                    </svg>
                </button>

                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
    visible: boolean;
    modalTrailer: boolean;
}>();

const emits = defineEmits(['close']);

const close = () => {
    emits('close');
};

const lockScroll = () => {
    document.body.style.overflow = 'hidden';
};

const unlockScroll = () => {
    document.body.style.overflow = '';
};

watch(() => props.visible, (newVal) => {
    if (newVal) {
        lockScroll();
    } else {
        unlockScroll();
    }
});

onUnmounted(() => {
    unlockScroll();
});

onMounted(() => {
    if (props.visible) {
        lockScroll();
    }
});
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 20px 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
    overflow: auto;
    opacity: 1;
    transition: opacity 0.5s ease;

    &__close {
        position: absolute;
        top: 0;
        right: -72px;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color .4s;
        overflow: auto;
        z-index: 100;

        svg {

            path {
                transition: fill .4s;
            }
        }

        &:hover {
            background-color: var(--color-accent);

            svg {

                path {
                    fill: #fff;
                }
            }
        }
    }

    &__content {
        position: relative;
        top: 30%;
        left: 50%;
        width: fit-content;
        padding: 0 0 60px;
        transform: translateX(-50%);
    }

    @media only screen and (max-width: 1024px) {

        &__content {
            top: 15%;
            padding-bottom: 32px;
        }

        &__close {
            top: 12px;
            right: 12px;
            width: 32px;
            height: 32px;
            border: none;

            &:hover {
                background-color: unset;

                svg {

                    path {
                        fill: var(--background-black)
                    }
                }
            }
        }

        &.modal--trailer {
            padding: 0;

            .modal__content {
                top: 30%;
                left: 0;
                width: 100%;
                transform: none;

                @media (orientation: landscape) {
                    top: 0;
                    left: 0;
                    height: 100%;
                    padding-right: 74px;
                    padding-left: 74px;
                    padding-bottom: 0;
                }
            }
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
