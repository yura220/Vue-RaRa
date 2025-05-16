<script setup>
import './css/bottomButton.css'
</script>

<template>
  <aside id="aside">
    <div class="aside-box">
      <router-link to="/sunny">
        <button>
          <i class="a-icon">맑음</i>
        </button>
      </router-link>
      <router-link to="/cloudy">
      <button>
        <i class="a-icon">흐림</i>
      </button>
      </router-link>
      <router-link to="/rainy">
        <button>
          <i class="a-icon">비</i>
        </button>
      </router-link>
      <router-link to="/snowy">
        <button>
          <i class="a-icon">눈</i>
        </button>
      </router-link>
    </div>
  </aside>
</template>