import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import CodyList from '../components/CodyList.vue';
import CodyDetail from '../components/CodyDetail.vue';
import Event from '../components/Event.vue';


const routes = [
  //  아이템 상세 뷰
  {
  path: '/:weatherType(rainy|sunny|cloudy|snowy)',
  component: CodyList,
},
  {
    path: '/event',
    component: Event,
  },
  {
    path: '/',
    component: Home,
  },
  // 잘못된 경로 → 홈으로
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
