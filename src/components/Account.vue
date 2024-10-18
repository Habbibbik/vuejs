<template>
    <div class="account">
        <div class="container">
            <h1 class="account__title">My account</h1>
            <Tabs :tabs="tabs" v-model:activeTab="activeTab"/>
            <TabContent :activeTab="activeTab">
                <div v-if="activeTab === 'tab1'">
                    <FavoriteMovies/>
                </div>

                <div v-if="activeTab === 'tab2'">
                   <AccountSettings />
                </div>
            </TabContent>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import Tabs from "@/components/common/Tabs.vue";
import TabContent from "@/components/common/TabContent.vue";
import type {Tab} from "@/types/tab";
import FavoriteMovies from "@/components/FavoriteMovies.vue";
import {useScreenSize} from '@/utils/useScreenSize';
import AccountSettings from "@/components/AccountSettings.vue";

const originalTabs: Tab[] = [
    {
        key: 'tab1',
        label: 'Favorite Films',
        icon: '/src/assets/images/icons/icon-favorite.svg'
    },
    {
        key: 'tab2',
        label: 'Account settings',
        icon: '/src/assets/images/icons/icon-user.svg'
    },
];

const tabs = ref<Tab[]>([...originalTabs]);

const {screenWidth} = useScreenSize();
const activeTab = ref('tab1');

watch(screenWidth, (newWidth) => {
    if (newWidth < 1024) {
        tabs.value = originalTabs.map(tab => {
            if (tab.key === 'tab1') {
                return { ...tab, label: 'Favorites' };
            } else if (tab.key === 'tab2') {
                return { ...tab, label: 'Settings' };
            }
            return tab;
        });
    } else {
        tabs.value = [...originalTabs];
    }
}, { immediate: true });
</script>

<style scoped lang="scss">
.account {
    padding: 64px 0 0;
    
    @media only screen and (max-width: 1024px) {
        padding-top: 24px;
    }
}
</style>