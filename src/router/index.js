import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/components/Home.vue';
import Sunny from '../src/components/Sunny.vue';
import Cloudy from '../src/components/Cloudy.vue';
import Snowy from '../src/components/Snowy.vue';
import Rainy from '../src/components/Rainy.vue';
import Event from '../src/components/Event.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/Sunny', component: Sunny },
  { path: '/Cloudy', component: Cloudy },
  { path: '/Snowy', component: Snowy },
  { path: '/Rainy', component: Rainy },
  { path: '/Event', component: Event },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
