<template>
    <div class="auth">
        <img src="@/assets/images/logo.svg" alt="CinemaGuide" class="auth__logo">
        <div v-if="!isRegister && !registrationSuccess">
            <form
                class="auth__form"
                @submit.prevent="handleLogin"
                autocomplete="off"
            >
                <input
                    class="auth__form-input"
                    type="email"
                    name="email"
                    v-model="loginEmail"
                    placeholder="Email"
                >
                <input
                    class="auth__form-input"
                    type="password"
                    name="password"
                    v-model="loginPassword"
                    placeholder="Password"
                >
                <button class="btn auth__btn" type="submit">Sign in</button>
            </form>

            <button class="btn btn--text auth__btn" @click="toggleForm">Sign up</button>
        </div>

        <template v-else-if="registrationSuccess">
            <h4 class="auth__title">Registration is complete</h4>
            <p class="auth__desc">Use your email to log in</p>
            <button class="btn auth__btn" @click="toggleForm">Sign in</button>
        </template>

        <div v-else>
            <h4 class="auth__form-title">Sign up</h4>
            <form
                @submit.prevent="handleRegister"
                class="auth__form"
                autocomplete="off"
            >
                <input
                    :class="{ 'error': registerEmailError }"
                    class="auth__form-input"
                    type="email"
                    name="email"
                    v-model="registerEmail"
                    placeholder="Email"
                >
                <input
                    :class="{ 'error': registerNameError }"
                    class="auth__form-input"
                    type="text"
                    name="firstName"
                    v-model="registerName"
                    placeholder="Name"
                >
                <input
                    :class="{ 'error': registerSurnameError }"
                    class="auth__form-input"
                    type="text"
                    name="lastName"
                    v-model="registerSurname"
                    placeholder="Surname"
                >
                <input
                    :class="{ 'error': registerPasswordError }"
                    class="auth__form-input"
                    type="password"
                    name="password"
                    v-model="registerPassword"
                    placeholder="Password"
                >
                <input
                    :class="{ 'error': registerConfirmPasswordError }"
                    class="auth__form-input"
                    type="password"
                    name="confirmPassword"
                    v-model="registerConfirmPassword"
                    placeholder="Confirm password"
                >
                <button type="submit" class="btn auth__btn">Create account</button>
            </form>
            <button @click="toggleForm" class="btn btn--text auth__btn">I have an account</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { register } from '@/api/auth';
import type { AuthInfo } from '@/types/authInfo';
import type { RegisterData } from '@/types/registerData';
import { useToast } from 'vue-toast-notification';

defineProps<{ visible: boolean }>();
const emits = defineEmits(['close']);

const authStore = useAuthStore();
const isRegister = ref(false);
const registrationSuccess = ref(false);
const toast = useToast();

const loginEmail = ref('');
const loginPassword = ref('');

const registerEmail = ref('');
const registerName = ref('');
const registerSurname = ref('');
const registerPassword = ref('');
const registerConfirmPassword = ref('');

const registerEmailError = ref(false);
const registerNameError = ref(false);
const registerSurnameError = ref(false);
const registerPasswordError = ref(false);
const registerConfirmPasswordError = ref(false);

const toggleForm = () => {
    isRegister.value = !isRegister.value;
    registrationSuccess.value = false;
};

const handleClose = () => {
    emits('close');
};

const handleLogin = async () => {
    const userData: AuthInfo = {
        email: loginEmail.value,
        password: loginPassword.value,
    };
    try {
        const result = await authStore.loginUser(userData);
        toast.success('Successful login!');
        if (result.result) {
            handleClose();
        }
    } catch (error) {
        toast.error('Login error: ' + (error as Error).message);
    }
};

const handleRegister = async () => {
    registerEmailError.value = !registerEmail.value;
    registerNameError.value = !registerName.value;
    registerSurnameError.value = !registerSurname.value;
    registerPasswordError.value = !registerPassword.value;
    registerConfirmPasswordError.value = !registerConfirmPassword.value || (registerPassword.value !== registerConfirmPassword.value);

    if (registerEmailError.value || registerNameError.value || registerSurnameError.value || registerPasswordError.value || registerConfirmPasswordError.value) {
        toast.error('Please fill in all fields correctly.');
        return;
    }

    const userData: RegisterData = {
        email: registerEmail.value,
        password: registerPassword.value,
        name: registerName.value,
        surname: registerSurname.value,
    };
    try {
        const result = await register(userData);
        if (result.success) {
            toast.success('Registration is complete! Use your email to log in.');
            registrationSuccess.value = true;
        }
    } catch (error) {
        toast.error('Registration error: ' + (error as Error).message);
    }
};

</script>

<style scoped lang="scss">
.auth {
    width: 420px;
    display: flex;
    flex-direction: column;
    padding: 64px 40px;
    background-color: #fff;
    text-align: center;
    border-radius: 24px;

    &__logo {
        width: 180px;
        height: 24px;
        margin: 0 auto 40px;
    }

    &__form {
        margin: 0 0 24px;

        &-input {
            width: 100%;
            padding: 16px 16px 16px 52px;
            margin: 0 0 12px;
            font-size: 18px;
            line-height: 1.33;
            border: 1px solid rgba(0, 0, 0, 0.40);
            border-radius: 8px;
            outline: none;
            background-repeat: no-repeat;
            background-size: 24px 24px;
            background-position: 16px center;
            transition: border-color .4s, background-image .4s;

            &[name="email"] {
                background-image: url("@/assets/images/icons/icon-mail.svg");
            }

            &[name="password"],
            &[name="confirmPassword"] {
                background-image: url("@/assets/images/icons/icon-password.svg");
            }

            &[name="firstName"],
            &[name="lastName"] {
                background-image: url("@/assets/images/icons/icon-person.svg");
            }

            &:last-child {
                margin-bottom: 24px;
            }

            &:hover,
            &:focus {

                &[name="email"] {
                    background-image: url("@/assets/images/icons/icon-mail-hover.svg");
                }

                &[name="password"],
                &[name="confirmPassword"] {
                    background-image: url("@/assets/images/icons/icon-password-hover.svg");
                }

                &[name="firstName"],
                &[name="lastName"] {
                    background-image: url("@/assets/images/icons/icon-person-hover.svg");
                }
            }
        }

        &-input.error {
            border-color: var(--color-error);
        }

        &-input.error[name="email"] {
            background-image: url("@/assets/images/icons/icon-mail-error.svg");
        }

        &-input.error[name="password"],
        &-input.error[name="confirmPassword"] {
            background-image: url("@/assets/images/icons/icon-password-error.svg");
        }

        &-input.error[name="firstName"],
        &-input.error[name="lastName"] {
            background-image: url("@/assets/images/icons/icon-person-error.svg");
        }
    }

    &__btn {
        width: 100%;
    }

    &__title {
        margin: 0 0 24px;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        color: #000;
    }

    &__desc {
        margin: 0 0 24px;
        font-size: 18px;
        text-align: center;
        color: #000;
    }

    @media only screen and (max-width: 1024px) {
        width: 100%;
        max-width: 400px;
    }
}
</style>
