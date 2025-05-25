<script setup>
import './css/header.css'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const isEventPage = computed(() => route.path === '/event')

//사이드바랑 토글 -----------------------------------------------------------------------
const props = defineProps(['isMobile', 'isSideOpen'])
const emit = defineEmits(['toggleSide'])

function handleHamburgerClick() {
  if (props.isMobile) {
    emit('toggleSide')   // 모바일: 사이드바 열기/닫기
  } else {
    router.push('/404-error')  // 데스크탑: 404 페이지로 이동
  }
}

//404링크 -----------------------------------------------------------------------------
function goTo(path) {
  router.push(path)
}
</script>

<template>
  <header :class="{ 'event-header': isEventPage }" id="header">
    <div class="wrap flex">
      <div class="nav-right">
        <img :src="isEventPage ? '/img/event-my.png' : '/img/my.png'" alt="유저 아이콘" class="icon" @click="goTo('/404-error')" v-show="!isMobile || !isSideOpen"/>
        <img :src="isEventPage ? '/img/event-bag.png' : '/img/bag.png'" alt="장바구니" class="icon" @click="goTo('/404-error')" v-show="!isMobile || !isSideOpen"/>
        <img :src="isEventPage ? '/img/event-hamburger.png' : '/img/hamburger.png'" alt="햄버거 아이콘" class="icon"  @click="handleHamburgerClick"/>
      </div>
    </div>
  </header>
</template>

