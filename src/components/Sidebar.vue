<script setup>
import './css/sidebar.css'
</script>

<template>
  <div id="side">
    <div class="flex">
      <router-link to="/">
        <img src="/img/wlogo.png" alt="로고" class="logo" />
      </router-link>
      <ul class="side-icon">
        <router-link to="/sunny" aria-label="맑음">
          <li>
            <i class="s-icon s-icon1" aria-hidden="true"></i>
          </li>
        </router-link>
        <router-link to="/cloudy" aria-label="흐림">
          <li>
            <i class="s-icon s-icon2" aria-hidden="true"></i>
          </li>
        </router-link>
        <router-link to="/rainy" aria-label="비">
          <li>
            <i class="s-icon s-icon3" aria-hidden="true"></i>
          </li>
        </router-link>
        <router-link to="/snowy" aria-label="눈">
          <li>
            <i class="s-icon s-icon4" aria-hidden="true"></i>
          </li>
        </router-link>
        <router-link to="/best" aria-label="추천상품">
          <li>
            <i class="s-icon s-icon5" aria-hidden="true"></i>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>
