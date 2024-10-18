<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <div class="logo">
                    <router-link to="/">
                        <img src="@/assets/images/logo.svg" alt="CinemaGuide Logo" class="img-responsive">
                    </router-link>
                </div>

                <nav
                    v-if="screenWidth >= 1024"
                    class="nav"
                >
                    <router-link to="/" exact>Главная</router-link>
                    <router-link to="/genres">Жанры</router-link>
                </nav>

                <Search v-if="screenWidth >= 1024" />

                <div
                    v-if="screenWidth >= 1024"
                    class="login"
                >
                    <button
                        v-if="!authStore.isAuthenticated"
                        @click="showAuthModal = true"
                    >
                        Войти
                    </button>
                    <router-link v-else :to="'/account'">{{ authStore.user?.name }}</router-link>
                </div>

                <div
                    v-if="screenWidth <= 1024"
                    class="mobile-actions"
                >
                    <router-link
                        to="/genres"
                        class="mobile-actions__btn"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="icon / genres">
                                <path id="Vector"
                                      d="M7 11.5C4.51472 11.5 2.5 9.48528 2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528
                                      2.5 11.5 4.51472 11.5 7C11.5 9.48528 9.48528 11.5 7 11.5ZM7 21.5C4.51472 21.5 2.5
                                      19.4853 2.5 17C2.5 14.5147 4.51472 12.5 7 12.5C9.48528 12.5 11.5 14.5147 11.5
                                      17C11.5 19.4853 9.48528 21.5 7 21.5ZM17 11.5C14.5147 11.5 12.5 9.48528 12.5 7C12.5
                                      4.51472 14.5147 2.5 17 2.5C19.4853 2.5 21.5 4.51472 21.5 7C21.5 9.48528 19.4853
                                      11.5 17 11.5ZM17 21.5C14.5147 21.5 12.5 19.4853 12.5 17C12.5 14.5147 14.5147
                                      12.5 17 12.5C19.4853 12.5 21.5 14.5147 21.5 17C21.5 19.4853 19.4853 21.5 17
                                      21.5ZM7 9.5C8.38071 9.5 9.5 8.38071 9.5 7C9.5 5.61929 8.38071 4.5 7 4.5C5.61929
                                      4.5 4.5 5.61929 4.5 7C4.5 8.38071 5.61929 9.5 7 9.5ZM7 19.5C8.38071 19.5 9.5
                                      18.3807 9.5 17C9.5 15.6193 8.38071 14.5 7 14.5C5.61929 14.5 4.5 15.6193 4.5 17C4.5
                                      18.3807 5.61929 19.5 7 19.5ZM17 9.5C18.3807 9.5 19.5 8.38071 19.5 7C19.5 5.61929
                                       18.3807 4.5 17 4.5C15.6193 4.5 14.5 5.61929 14.5 7C14.5 8.38071 15.6193 9.5 17
                                       9.5ZM17 19.5C18.3807 19.5 19.5 18.3807 19.5 17C19.5 15.6193 18.3807 14.5 17
                                       14.5C15.6193 14.5 14.5 15.6193 14.5 17C14.5 18.3807 15.6193 19.5 17 19.5Z"
                                      fill="white"/>
                            </g>
                        </svg>
                    </router-link>

                    <button
                        @click="isSearchVisible = true"
                        class="mobile-actions__btn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769
                                19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032
                                20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146
                                18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325
                                18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                                fill="white"/>
                        </svg>
                    </button>

                    <button
                        v-if="!authStore.isAuthenticated"
                        @click="showAuthModal = true"
                        class="mobile-actions__btn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none">
                            <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18
                                18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315
                                6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12
                                11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                                  fill="white"/>
                        </svg>
                    </button>
                    <router-link
                        v-else
                        :to="'/account'"
                        class="mobile-actions__btn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none">
                            <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18
                                18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315
                                6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12
                                11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                                  fill="white"/>
                        </svg>
                    </router-link>
                </div>
            </div>
        </div>
    </header>

    <MobileSearch
        v-if="screenWidth <= 1024"
        :visible="isSearchVisible"
        @close="isSearchVisible = false"
    />

    <Modal
        :visible="showAuthModal"
        @close="showAuthModal = false"
        :modal-trailer="false"
    >
        <AuthModal :visible="showAuthModal" @close="showAuthModal = false"/>
    </Modal>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useAuthStore} from "@/stores/useAuthStore";
import Modal from "@/components/common/modal/Modal.vue";
import AuthModal from "@/components/common/modal/AuthModal.vue";
import {useScreenSize} from '@/utils/useScreenSize';
import MobileSearch from "@/components/mobile/MobileSearch.vue";
import Search from "@/components/common/Search.vue";

const showAuthModal = ref(false);
const authStore = useAuthStore();
const {screenWidth} = useScreenSize();
const isSearchVisible = ref(false);
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 24px 0;
    background: rgba(0, 0, 0, 0.50);
    backdrop-filter: blur(10px);
    z-index: 2;

    &__inner {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 240px;
        height: 32px;

        a {
            display: block;
        }
    }

    .nav {
        display: flex;
        align-items: center;
        margin: 0 0 0 80px;

        a {
            position: relative;
            margin: 0 40px 0 0;
            font-size: 24px;
            line-height: 2;
            text-decoration: none;
            color: #fff;

            &::before {
                content: '';
                position: absolute;
                right: 0;
                bottom: 0;
                width: 0;
                height: 2px;
                background-color: var(--color-accent);
                transition: all .4s;
            }

            &:last-child {
                margin-right: 0;
            }

            &:hover {

                &::before {
                    left: 0;
                    width: 100%;
                }
            }

            &.router-link-active {

                &::before {
                    width: 100%;
                }
            }
        }
    }

    .login {
        margin: 0 0 0 auto;

        button,
        a {
            padding: 0;
            font-size: 24px;
            color: #fff;
            outline: none;
            border: none;
            background-color: transparent;
            cursor: pointer;
            transition: color .4s;

            &:hover {
                color: var(--color-accent);
            }
        }
    }

    @media only screen and (max-width: 1200px) {
        .logo {
            width: 160px;
            height: auto;
        }

        .nav {
            margin-left: 32px;

            a {
                margin-right: 24px;
                font-size: 18px;
            }
        }

        .search {
            margin-left: 32px;


            &__input {
                width: 420px;
            }
        }

        .login {

            button,
            a {
                font-size: 18px;
            }
        }
    }

    @media only screen and (max-width: 1024px) {
        padding-top: 16px;
        padding-bottom: 16px;

        .logo {
            width: 136px;
        }
    }
}

.mobile-actions {
    display: flex;
    align-items: center;
    margin: 0 0 0 auto;

    &__btn {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0 20px 0 0;
        background-color: transparent;
        border: none;
        outline: none;

        svg {
            width: 100%;
            height: 100%;
        }

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>