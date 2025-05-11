<script setup>
import { useRouter } from 'vue-router';
import VCalendar from 'v-calendar';
import BottomButton from './BottomButton.vue';
import './css/weather.css'
import { Calendar } from 'v-calendar';

const router = useRouter();

const tiles = [
  { type: 'sunny', label: '맑음', image: '/img/sunny.png', clickable: true },
  { type: 'cloudy', label: '흐림', image: '/img/cloudy.png', clickable: true },
  { type: 'rainy', label: '비', image: '/img/rainy.png', clickable: true },
  { type: 'snowy', label: '눈', image: '/img/snowy.png', clickable: true },
  { type: 'event', label: '이벤트', image: '/img/event.png', clickable: true },
];

function goToWeather(type) {
  if (type === 'event') {
    router.push('/event');
  } else {
    router.push(`/${type}/cody`);
  }
}
import { ref } from 'vue';

const calendarMarks = ref([
  {
    dates: new Date(),
    dot: true,
    popover: {
      label: '오늘'
    }
  }
]);
</script>
<style scoped>
.calendar {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
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
      <div class="calendar">
      <Calendar
  mode="month"
  is-expanded
  :attributes="calendarMarks"
    />
      </div>
    </div>
    <BottomButton />
  </section>
</template>

