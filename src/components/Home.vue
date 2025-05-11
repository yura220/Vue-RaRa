<script setup>
import './css/main.css'
import Weather from './Weather.vue';

</script>

<template>
  <div class="title">
    <div class="wrap">
      <div class="title-img">
        <img src="https://placehold.co/1920x800?text=title" alt="홈 타이틀 이미지" />
      </div>
      <div class="title-text">
        <h2>오늘 날씨에 맞는</h2>
        <p>쇼핑 큐레이션과 추천을 만나보세요!</p>
      </div>
    </div>
  </div>

  <Weather />
</template>
