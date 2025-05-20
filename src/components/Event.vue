<script setup>
import './css/event.css'
import Scratch from './Scratch.vue';
</script>

<template>
  <div class="event-container">
    <section class="event-slide">
      <img src="/img/event-page.png" alt="이벤트 페이지" />
      <Scratch />
    </section>
  </div>
</template>

<style scoped>
.event-container {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
}

.event-slide {
  width: 100%;
  height: 100%;
}

.event-slide img {
  width: 100%;
}
</style>