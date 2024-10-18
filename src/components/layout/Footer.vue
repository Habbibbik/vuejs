<template>
    <footer class="footer">
        <div class="container">
            <div class="footer__inner">
                <div class="footer__desc">LLC «Multimedia Vision»</div>
                <div class="footer__copyright">
                    All rights reserved
                </div>

                <SocialLinks />
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import SocialLinks from "@/components/common/SocialLinks.vue";

</script>

<style lang="scss" scoped>
.footer {
    padding: 48px 0;
    margin: auto 0 0;
    background-color: var(--background-black);
    z-index: 10;

    &__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__desc {
        font-size: 18px;
        font-weight: 700;
    }

    &__copyright {
        padding: 0 0 0 36px;
        margin: 0 auto 0 12px;
        font-size: 18px;
        color: var(--content-secondary);
        background-image: url("@/assets/images/icons/icon-copyright.svg");
        background-repeat: no-repeat;
        background-size: 24px 24px;
        background-position: left center;
    }

    @media only screen and (max-width: 1024px) {
        padding-top: 24px;
        padding-bottom: 24px;

        &__inner {
            flex-direction: column;
            align-items: flex-start;
        }

        &__desc {
            margin-bottom: 8px;
        }

        &__copyright {
            padding-left: 32px;
            margin-bottom: 32px;
            margin-left: 0;
            font-size: 14px;
            background-size: 20px 20px;
        }
    }
}
</style>