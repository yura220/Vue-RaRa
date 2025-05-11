<script setup>
import { useRoute } from 'vue-router';
import { weatherMap } from './js/weatherDataMap.js';
import './css/itemList.css'

const route = useRoute();
const weatherType = route.params.weatherType;
const groupId = Number(route.params.itemId);

const weatherData = weatherMap[weatherType];
const selectImage = weatherData.select.find(s => s.id === groupId)?.image;
const groupItems = weatherData.items.filter(item => item.group === groupId);
console.log('weatherType:', weatherType); // 'rainy'?
console.log('weatherData.items:', weatherData.items);
</script>

<template>
  <section id="item">
    <div class="i-layout">
      <div class="i-main">
        <img :src="selectImage" alt="코디 대표 이미지" class="i-image" />
      </div>

      <div class="i-box grid">
        <div
          v-for="item in groupItems"
          :key="item.id"
          class="i-card"
        >
          <img :src="item.image" class="i-thumb" />
          <div class="i-info">
            <strong>{{ item.brand }}</strong>
            <p>{{ item.desc }}</p>
            <p>{{ item.price }}</p>
            <div>
              <span class="buy">장바구니</span>
              <span class="buy">바로 구매</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
