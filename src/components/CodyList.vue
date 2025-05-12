<script setup>
import { useRoute } from 'vue-router';
import { weatherMap } from './js/weatherDataMap.js';
import './css/codyList.css';
import './css/codyDetail.css';
import './css/itemList.css';

const route = useRoute();
const weatherType = route.params.weatherType || 'rainy';
const weatherData = weatherMap[weatherType];

const codys = weatherData.cody;
const items = weatherData.items;

const detailImages = weatherData.detail || [];
const itemList = weatherData.items || [];
const select = weatherData.select?.[0]?.image

const weatherTypeLabel = {
  rainy: '비 오는 날',
  sunny: '화창한 날',
  snowy: '눈 오는 날',
  cloudy: '흐린 날',
}[weatherType];
</script>

<template>
  <section id="codylist">
    <div class="wrap">
      <div class="cody-layout">
        <div class="cody-left">
          <div class="cody-list">
            <div v-for="(select, index) in weatherData.cody" :key="select.id" class="s-card">
              <img :src="select.image" alt="코디 이미지" class="s-image" />
              <div v-if="index === 0" class="cody-desc">
                {{ weatherTypeLabel }}<br />
                입기 좋은 코디<br />
                TOP 3
              </div>
            </div>
          </div>
        </div>

        <div class="cody-right">
          <h3 class="a-title">{{ weatherTypeLabel.value }} 이렇게 해보세요</h3>
          <ul class="a-lists">
            <li v-for="(a, i) in weatherData.activities" :key="i" class="a-list">
              {{ a.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section id="detail">
    <div class="wrap">
      <div class="d-row">
        <div
          class="group-card"
          v-for="cody in codys"
          :key="cody.id"
        >
          <img  :src="detailImages.find(d => d.group === cody.group)?.image"  alt="디테일 이미지"  class="s-image"/>

          <!-- 하단 아이템 리스트 -->
          <div class="d-card">
            <ul class="d-lists">
              <li
                v-for="item in items.filter(i => i.group === cody.group)"
                :key="item.id"
                class="d-list"
              >
                <img :src="item.image" alt="아이템 이미지" class="d-thumb" />
                <div class="d-text">
                  <strong>{{ item.brand }}</strong><br />
                  {{ item.desc }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="item">
    <div class="wrap">
      <div class="i-layout">
        <div class="i-main">
          <img :src="weatherData.select[0].image" alt="코디 대표 이미지" class="i-image" />
        </div>

        <div class="i-box grid">
          <div v-for="item in itemList" :key="item.id" class="i-card">
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
    </div>
  </section>
</template>
