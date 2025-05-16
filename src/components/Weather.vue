<script setup>
import { useRouter } from 'vue-router';
import { Calendar } from 'v-calendar';
import Sidebar from './Sidebar.vue'

const router = useRouter();

const tiles = [
  { type: 'sunny', label: '맑음', image: 'https://placehold.co/340x340?text=sunny', clickable: true },
  { type: 'cloudy', label: '흐림', image: 'https://placehold.co/340x340?text=cloudy', clickable: true },
  { type: 'rainy', label: '비', image: 'https://placehold.co/340x340?text=rainy', clickable: true },
  { type: 'snowy', label: '눈', image: 'https://placehold.co/340x340?text=snowy', clickable: true },
  { type: 'event', label: '이벤트', image: 'https://placehold.co/340x340?text=event', clickable: true },
];

function goToWeather(type) {
  if (type === 'event') {
    router.push('/event');
  } else {
    router.push(`/${type}`);
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

<template>
  <Sidebar />
  <section id="weather">
    <div class="wrap">
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
    </div>
  </section>
</template>

<style scoped>
.calendar {
  max-width: 350px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>