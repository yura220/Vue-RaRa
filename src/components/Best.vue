<script setup>
import './css/best.css'
import { useRouter } from 'vue-router'
import { bestMap } from './js/bestDataMap.js'
import { ref, computed, nextTick, watch } from 'vue'
import { addToRecentViewed } from '../stores/recentViewed.js'

const base = import.meta.env.BASE_URL
const showPopup = ref(false)
const selectedIndex = ref(null)
const popupRef = ref(null)
const activeImage = ref('')
const activeColorName = ref('')

const router = useRouter()

const currentItem = computed(() => {
  return selectedIndex.value !== null ? bestMap[selectedIndex.value] : {}
})

// 팝업 닫기
function closePopup() {
  showPopup.value = false
  selectedIndex.value = null
}

// 팝업 열기(메인 상품 클릭)
function openPopup(index) {
  selectedIndex.value = index
  showPopup.value = true

  const item = bestMap[index]
  if (item && item.main?.colors?.length > 0) {
    activeImage.value = item.main.colors[0].image
    activeColorName.value = item.main.colors[0].name
  }
}

// ✅ 최근 본 상품 등록 + 최근 본 창 강제 오픈 (404 이동 없이)
function handleProductClick(item) {
  // id가 없으면 selectedIndex 또는 랜덤값
  const uniqueId = item.id ?? selectedIndex.value ?? Math.random().toString(36).slice(2)
  const routeKey = 'best'
  const _key = `${uniqueId}-${routeKey}`

  addToRecentViewed({
    id: uniqueId,
    name: item.name || item.desc || item.brand || currentItem.value.main?.name || '상품',
    image: item.image?.startsWith('http') ? item.image : (base + (item.image || currentItem.value.main?.colors?.[0]?.image || '')),
    brand: item.brand || currentItem.value.main?.brand || '',
    desc: item.desc || item.name || currentItem.value.main?.desc || '',
    routeKey,
    _key
  })
  localStorage.removeItem('recentClosedGlobal')
  window.dispatchEvent(new CustomEvent('reopen-recent'))
}

// 팝업 내 컬러 점 클릭시 이미지 변경
function selectColor(color) {
  activeImage.value = color.image
  activeColorName.value = color.name
}

const scrollRef = ref(null)
let isDraggingScroll = false
let scrollStartY = 0
let scrollTopAtStart = 0

function onScrollDragStart(e) {
  isDraggingScroll = true
  scrollStartY = e.touches ? e.touches[0].clientY : e.clientY
  scrollTopAtStart = scrollRef.value.scrollTop
}
function onScrollDragMove(e) {
  if (!isDraggingScroll || !scrollRef.value) return
  const currentY = e.touches ? e.touches[0].clientY : e.clientY
  const deltaY = scrollStartY - currentY
  scrollRef.value.scrollTop = scrollTopAtStart + deltaY
}
function onScrollDragEnd() {
  isDraggingScroll = false
}

function goBackOrHome() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>


<template>
  <section id="best">
    <div class="wrap flex">
      <h2>Let us recommend your kind of day.</h2>
      <div class="b-box">
        <ul>
          <li v-for="key in Object.keys(bestMap)" :key="key">
            <a href="#" class="btn" @click.prevent="openPopup(key)"></a>
          </li>
        </ul>
        <div class="p-wrap" v-if="showPopup" @click.self="closePopup">
          <div class="p-inner" ref="popupRef">
            <div class="p-main">
              <button class="close" @click="closePopup">×</button>
              <div
                class="p-content"
                ref="scrollRef"
                @mousedown="onScrollDragStart"
                @mousemove="onScrollDragMove"
                @mouseup="onScrollDragEnd"
                @mouseleave="onScrollDragEnd"
                @touchstart="onScrollDragStart"
                @touchmove="onScrollDragMove"
                @touchend="onScrollDragEnd"
              >
                <!-- 메인 상품 영역 -->
                <div class="p-top" v-if="currentItem.main">
                  <h3>{{ currentItem.main.brand }}</h3>
                  <p>{{ currentItem.main.name }}</p>
                  <p>{{ currentItem.main.price }}</p>
                  <div class="main-img">
                    <img :src="activeImage" :alt="activeColorName" />
                  </div>
                  <div class="p-dot">
                    <span
                      v-for="color in currentItem.main.colors"
                      :key="color.id"
                      class="color-dot"
                      :style="{ backgroundColor: color.colorCode }"
                      @click="selectColor(color)"
                    ></span>
                  </div>
                  <p class="active-color">Color : {{ activeColorName }}</p>
                  <p class="m-desc">{{ currentItem.main.desc }}</p>
                  <div class="c-btns">
                    <!-- 최신 bestMap[selectedIndex].main을 직접 넘긴다 -->
                    <button
                      class="c-btn c-btn1"
                      @click="handleProductClick(bestMap[selectedIndex].main)"
                    >
                      구매하기
                    </button>
                    <button
                      class="c-btn c-btn2"
                      @click="handleProductClick(bestMap[selectedIndex].main)"
                    >
                      장바구니
                    </button>
                  </div>
                  <div class="c-thumbs">
                    <div
                      v-for="color in currentItem.main.colors"
                      :key="color.id"
                      class="thumb-block"
                    >
                      <img
                        :src="color.image"
                        :alt="color.name"
                        class="thumb"
                        @click="selectColor(color)"
                      />
                    </div>
                  </div>
                </div>
                <!-- 연관상품 영역 -->
                <div class="p-bottom" v-if="currentItem.related">
                  <div class="r-items">
                    <div
                      v-for="rel in bestMap[selectedIndex]?.related || []"
                      :key="rel.id"
                      class="r-info"
                      @click="handleProductClick(rel)"
                    >
                      <div class="r-box">
                        <img :src="rel.image" :alt="rel.name" />
                      </div>
                      <p>{{ rel.brand }}</p>
                      <p>{{ rel.name }}</p>
                      <p>{{ rel.price }}</p>
                      <div class="r-btns">
                        <button class="c-btn c-btn1" @click.stop="handleProductClick(rel)">구매하기</button>
                        <button class="c-btn c-btn2" @click.stop="handleProductClick(rel)">장바구니</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> <!-- p-content -->
            </div> <!-- p-main -->
          </div> <!-- p-inner -->
        </div> <!-- p-wrap -->
      </div>
    </div>
  </section>
  <button class="back" @click="goBackOrHome">뒤로가기</button>
</template>
