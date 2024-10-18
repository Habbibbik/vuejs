<template>
    <div class="tabs">
        <button
            v-for="tab in tabs"
            :key="tab.key"
            :class="{'active': tab.key === activeTab}"
            class="tabs__btn"
            @click="selectTab(tab.key)">
            <img :src="tab.icon" alt="" class="icon" v-if="tab.icon"/>
            {{ tab.label }}
        </button>
    </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';
import type {Tab} from "@/types/tab";

interface Props {
    tabs: Tab[];
    activeTab: string;
}

defineProps<Props>();

const emit = defineEmits(['update:activeTab']);

const selectTab = (key: string) => {
    emit('update:activeTab', key);
};
</script>

<style scoped lang="scss">
.tabs {
    display: flex;
    align-items: center;
    margin: 0 0 64px;

    &__btn {
        display: flex;
        align-items: center;
        padding: 12px 0;
        margin: 0 64px 0 0;
        font-size: 24px;
        color: #fff;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid transparent;
        outline: none;
        cursor: pointer;
        transition: border-color .4s;

        img {
            width: 24px;
            height: 24px;
            margin: 0 8px 0 0;
        }

        &:last-child {
            margin-right: 0;
        }

        &.active {
            border-bottom-color: var(--color-accent);
        }
    }
    
    @media only screen and (max-width: 1024px) {
        margin-bottom: 0;

        &__btn {
            margin-right: 24px;
            font-size: 24px;
        }
    }
}
</style>
