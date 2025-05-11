<script setup>
import { useRouter, useRoute } from 'vue-router';
import { weatherMap } from './js/weatherDataMap.js';
import './css/codyList.css'

const router = useRouter();
const route = useRoute();
const weatherType = route.params.weatherType || 'rainy';
const weatherData = weatherMap[weatherType];

const weatherTypeLabel = {
  rainy: '비 오는 날',
  sunny: '화창한 날',
  snowy: '눈 오는 날',
  cloudy: '흐린 날',
}[weatherType];

function goToDetail() {
  router.push(`/${weatherType}/cody/detail`);
}
</script>

<template>
  <section id="codylist">
    <div class="cody-layout">
      <section class="cody-left">
        <div class="cody-list">
          <div v-for="(select, index) in weatherData.cody" :key="select.id" class="s-card" @click="goToDetail">
            <img :src="select.image" alt="코디 이미지" class="s-image" />
            <!--  첫 번째 카드에만 텍스트 -->
            <div v-if="index === 0" class="cody-desc">
              {{ weatherTypeLabel }}<br />
              입기 좋은 코디<br />
              TOP 3
            </div>
          </div>
        </div>
      </section>

      <section class="cody-right">
        <h3 class="a-title">{{ weatherTypeLabel }} 이렇게 해보세요</h3>
        <ul class="a-lists">
          <li
            v-for="(a, i) in weatherData.activities"
            :key="i"
            class="a-list"
          >
            {{ a.title }}
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>
