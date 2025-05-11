<script setup>
import { useRoute, useRouter } from 'vue-router';
import { weatherMap } from './js/weatherDataMap.js';
import './css/codyDetail.css'

const route = useRoute();
const router = useRouter();
const weatherType = route.params.weatherType;
const weatherData = weatherMap[weatherType];
const codys = weatherData.cody;
const selectImages = weatherData.select;
console.log('codys:', codys);
console.log('selectImages:', selectImages);

</script>

<template>
  <section id="detail">
    <div class="d-row">
      <div
        class="group-card"
        v-for="select in selectImages"
        :key="select.id"
      >
        <img
          :src="select.image"
          alt="코디 대표 이미지"
          class="s-image"
          @click="router.push(`/${weatherType}/cody/detail/item/${select.id}`)"
        />
        <div
          class="d-card"
          v-for="cody in codys.filter(c => c.group === select.id)"
          :key="cody.id"
        >
          <ul class="d-lists">
            <li
              v-for="(item, i) in cody.items"
              :key="i"
              class="d-list"
              @click="router.push(`/${weatherType}/cody/detail/item/${select.id}`)"
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
  </section>
</template>
