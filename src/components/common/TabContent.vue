<template>
    <div class="tab-content">
        <template
            v-if="activeTab === 'tab1'"
        >
            <slot></slot>
        </template>
        <template
            v-if="activeTab === 'tab2'"
        >
            <slot></slot>
        </template>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    activeTab: String,
});
</script>

<style scoped lang="scss">

</style>
