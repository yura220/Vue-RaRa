<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
const router = useRouter()
const route = useRoute()

function goBackOrHome() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>
<template>
  <div class="n-box">
    <img src="/img/404.png" alt="404 Not Found" class="n-image" />
    <p class="n-text">페이지를 찾을 수 없습니다.</p>
  </div>
  <button class="back" @click="goBackOrHome">뒤로가기</button>
</template>