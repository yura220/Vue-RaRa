import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/components/Home.vue';
import Weather from '../src/components/Weather.vue';
import Event from '../src/components/Event.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/weather/:type', component: Weather },
  { path: '/event', component: Event },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
