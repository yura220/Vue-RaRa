<script setup>
import './css/main.css'
import Weather from './Weather.vue';
import Popup from './Popup.vue'
import BottomButton from './BottomButton.vue'
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const showPopup = ref(false);
const dontShowAgain = ref(false);
const todayKey = `hidePopup_${new Date().toISOString().slice(0, 10)}`;

onMounted(() => {
  const hideToday = localStorage.getItem(todayKey);
  if (!hideToday) {
    showPopup.value = true;
  }
});

function goToEvent() {
  router.push('/event');
}

function handleClose() {
  if (dontShowAgain.value) {
    localStorage.setItem(todayKey, 'true');
  }
  showPopup.value = false;
}
</script>

<template>
  <Popup v-if="showPopup" @close="showPopup = false">
    <div class="event-popup">
      <p>Your Daily Forecast for Feel-Good Finds.</p>
      <h2>당신을 위한 오늘의 기분 좋은 쇼핑 예보.</h2>
      <div class="event-click" @click="goToEvent">
        <p>오늘은 당신만의 색을 입는 날이에요. 밝게 빛나봐요!”</p>
        <h3>전 상품 할인 쿠폰 2000원 할인 🎁</h3>
      </div>
    </div>

    <label style="display: flex; align-items: center; margin-top: 1rem;">
      <input type="checkbox" v-model="dontShowAgain" />
      <span style="margin-left: 0.5rem;">오늘 하루 이 창 열지 않기</span>
    </label>

    <button class="close-btn" @click="handleClose">닫기</button>
  </Popup>
  <main id="title">
    <div class="title-wrap">
      <div class="title-img">
        <img src="https://placehold.co/1920x800?text=title" alt="홈 타이틀 이미지" />
      </div>
      <div class="title-text">
        <h2>오늘 날씨에 맞는</h2>
        <p>쇼핑 큐레이션과 추천을 만나보세요!</p>
      </div>
    </div>
  </main>

  <Weather />
  <BottomButton />
</template>
<style scoped>
.event-click {
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>