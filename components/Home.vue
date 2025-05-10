<script setup>
import './css/main.css'

const weathers = [
  { type: 'sunny', image: '/img/sunny.png', label: '맑은 날 ☀️' },
  { type: 'cloudy', image: '/img/cloudy.png', label: '흐린 날 ☁️' },
  { type: 'rainy', image: '/img/rainy.png', label: '비 오는 날 🌧️' },
  { type: 'snowy', image: '/img/snowy.png', label: '눈 오는 날 ❄️' }
];
</script>

<template>
  <!-- 타이틀 영역 -->
  <div class="title">
    <div class="wrap">
      <div class="title-img">
        <img src="/img/main.png" alt="홈 타이틀 이미지" />
      </div>
      <div class="title-text">
        <h2>오늘 날씨에 맞는</h2>
        <p>쇼핑 큐레이션과 추천을 만나보세요!</p>
      </div>
    </div>
  </div>

  <!-- 날씨 선택 영역 -->
  <section class="w-select">
    <h2>오늘 날씨를 골라주세요 😊</h2>
    <p class="sub">날씨에 맞는 쇼핑 추천 콘텐츠를 준비했어요!</p>

    <div class="w-grid">
      <router-link
        v-for="weather in weathers"
        :key="weather.type"
        :to="`/${weather.type}`"
        class="w-box"
      >
        <img :src="weather.image" :alt="weather.type" class="w-img home-img" />
        <p class="home-label">{{ weather.label }}</p>
      </router-link>

      <router-link to="/event" class="w-box event-box">
        <img src="/img/event.png" alt="event" class="home-img">
        <p class="home-label">이벤트 🎁</p>
      </router-link>
    </div>
  </section>
</template>
