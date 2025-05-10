<script setup>
import { useRouter } from 'vue-router';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import HeaderNav from './HeaderNav.vue';
import BottomButton from './BottomButton.vue';
import './css/weather.css'

const router = useRouter();

const tiles = [
  { type: 'sunny', label: '맑음', image: '/img/sunny.png', clickable: true },
  { type: 'cloudy', label: '흐림', image: '/img/cloudy.png', clickable: true },
  { type: 'rainy', label: '비', image: '/img/rainy.png', clickable: true },
  { type: 'snowy', label: '눈', image: '/img/snowy.png', clickable: true },
  { type: 'event', label: '이벤트', image: '/img/event.png', clickable: true },
];

function goToWeather(type) {
  router.push(`/${type}`);
}
</script>

<template>
  <section id="weather">
    <HeaderNav />
    <div class="w-grid">
      <div
        v-for="tile in tiles"
        :key="tile.type"
        class="tile"
        @click="goToWeather(tile.type)"
      >
        <img :src="tile.image" :alt="tile.label" class="tile-img" />
        <p class="tile-label">{{ tile.label }}</p>
      </div>
    </div>

    <div class="calendar">
      <VueCal :time="false" />
    </div>
    <BottomButton />
  </section>
</template>

