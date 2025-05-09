<script setup>
import { useRoute } from 'vue-router';
import ActivityList from './ActivityList.vue';
import CodyList from './CodyList.vue';
import ItemList from './ItemList.vue';
import { weatherMap } from '../data/weatherDataMap.js';

const route = useRoute();
const weatherType = route.params.type;
const weatherData = weatherMap[weatherType] || weatherMap.sunny;
</script>

<template>
  <div :class="`weather-page ${weatherType}`">
    <h1>{{ weatherType.toUpperCase() }} WEATHER</h1>
    <CodyList :items="weatherData.cody" />
    <ActivityList :items="weatherData.activities" />
    <ItemList :items="weatherData.items" />
  </div>
</template>
