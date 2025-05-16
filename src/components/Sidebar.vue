<script setup>
import './css/sidebar.css'
import { useRoute } from 'vue-router';

const route = useRoute();

const icons = [
  { type: 'sunny', label: '맑음', iconClass: 's-icon1', path: '/sunny' },
  { type: 'cloudy', label: '흐림', iconClass: 's-icon2', path: '/cloudy' },
  { type: 'rainy', label: '비', iconClass: 's-icon3', path: '/rainy' },
  { type: 'snowy', label: '눈', iconClass: 's-icon4', path: '/snowy' },
  { type: 'best', label: '추천상품', iconClass: 's-icon5', path: '/best' }
];

function isActive(icon) {
  // weatherType 기반 경로
  const pathMatch = route.params.weatherType === icon.type
  // 또는 직접 경로 기반 (best 포함)
  const pathExact = route.path === icon.path
  return pathMatch || pathExact
}
</script>

<template>
  <div id="side">
    <div class="flex">
      <router-link to="/">
        <img src="/img/wlogo.png" alt="로고" class="logo" />
      </router-link>
      <ul class="side-icon">
        <li v-for="icon in icons" :key="icon.type">
          <router-link :to="icon.path" :aria-label="icon.label">
            <i
              class="s-icon"
              :class="[icon.iconClass, isActive(icon) ? 'active' : '']"
              aria-hidden="true"
            ></i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
