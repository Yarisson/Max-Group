<template>
    <section class="details-wrapper">
        <div class="details">
            <h2 class="details__title">Общая информация</h2>
            <div class="details__text"><span class="details__text-left">Город - </span><span>{{ city }}</span></div>
            <div class="details__text"><span class="details__text-left">Страна - </span><span>{{ country }}</span></div>
            <div class="details__text"><span class="details__text-left">Код страны - </span><span>{{ code }}</span></div>
            <div class="details__text"><span class="details__text-left">Провайдер - </span><span>{{ isp }}</span></div>
            <div class="details__text"><span class="details__text-left">Регион - </span><span>{{ regionName }}</span></div>
            <div class="details__text"><span class="details__text-left">IP адрес - </span><span>{{ ip }}</span></div>
            <div class="details__text"><span class="details__text-left">Почтовый индекс - </span><span>{{ zip }}</span></div>
        </div>
    </section>  
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const ip = router.currentRoute.value.query.ip
const city = router.currentRoute.value.query.city
const country = router.currentRoute.value.query.country
const code = router.currentRoute.value.query.code
const isp = router.currentRoute.value.query.isp
const regionName = router.currentRoute.value.query.regionName
const zip = router.currentRoute.value.query.zip
</script>

<style lang="scss">
.details-wrapper {
    background-color: snow;
}

.details {
    width: 620px;
    margin: auto;
    padding: 20px;
    &__title {
        margin-bottom: 24px;
    }

    &__text {
        padding: 16px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #421463;
    }

    &__text-left {
        margin-right: 10px;
    }
}
</style>