<template>
    <div :class="ratingClass">{{ formattedRating }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ rating: number }>();

const formattedRating = computed(() => props.rating.toFixed(1));

const ratingClass = computed(() => {
    if (props.rating < 5) {
        return 'rating rating--red';
    } else if (props.rating >= 5 && props.rating < 7) {
        return 'rating rating--grey';
    } else if (props.rating >= 7 && props.rating < 8) {
        return 'rating rating--green';
    } else {
        return 'rating rating--gold';
    }
});
</script>

<style scoped lang="scss">
.rating {
    padding: 4px 12px 4px 32px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    border-radius: 16px;
    background-image: url("@/assets/images/icons/icon-star.svg");
    background-repeat: no-repeat;
    background-size: 16px 16px;
    background-position: 12px center;
}

.rating--red {
    background-color: #C82020;
}

.rating--grey {
    background-color: #777;
}

.rating--green {
    background-color: var(--color-green);
}

.rating--gold {
    background-color: #A59400;
}
</style>
