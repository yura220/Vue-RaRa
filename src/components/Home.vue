<script setup>
import './css/main.css'
import Weather from './Weather.vue';

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

  <Weather />
</template>
