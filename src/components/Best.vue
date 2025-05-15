<script setup>
import './css/best.css'
import {bestMap} from './js/bestDataMap.js'
import { ref, computed, nextTick, watch } from 'vue'

const showPopup = ref(false)
const selectedIndex = ref(null)

const currentItem = computed(() => {
  return selectedIndex.value !== null ? bestMap[selectedIndex.value] : {}
})

function closePopup() {
  showPopup.value = false
  selectedIndex.value = null
}
const popupRef = ref(null)
let startY = 0
let currentY = 0
let dragging = false

function getEventY(e) {
  return e.touches ? e.touches[0].clientY : e.clientY
}

function startDrag(e) {
  dragging = true
  startY = getEventY(e) - currentY
}

function onDrag(e) {
  if (!dragging) return
  const y = getEventY(e)
  currentY = y - startY
  popupRef.value.style.transform = `translateY(${currentY}px)`
}

function endDrag() {
  dragging = false
}
const activeImage = ref('') // 현재 크게 보여줄 이미지

watch(selectedIndex, (newIndex) => {
  const item = bestMap[newIndex]
  if (item && item.main?.colors?.length > 0) {
    activeImage.value = item.main.colors[0].image
  }
})

const activeColorName = ref('')

function openPopup(index) {
  selectedIndex.value = index
  showPopup.value = true

  const item = bestMap[index]
  if (item && item.main?.colors?.length > 0) {
    activeImage.value = item.main.colors[0].image
    activeColorName.value = item.main.colors[0].name
  }

  nextTick(() => {
    currentY = 0
    if (popupRef.value) {
      popupRef.value.style.transform = `translateY(0px)`
    }
  })
}
</script>

<template>
  <section id="best">
    <div class="wrap flex">
      <h2>Let us recommend your kind of day.</h2>
      <div class="b-box">
        <ul>
          <li v-for="key in Object.keys(bestMap)" :key="key">
            <a href="#" class="btn" @click.prevent="openPopup(key)">
              {{ key }}
            </a>
          </li>
        </ul>
        <div class="p-wrap" v-if="showPopup" @click.self="closePopup">
          <div class="p-inner" ref="popupRef"
            @mousedown="startDrag"
            @mousemove="onDrag"
            @mouseup="endDrag"
            @mouseleave="endDrag"
            @touchstart="startDrag"
            @touchmove="onDrag"
            @touchend="endDrag">
            <div class="p-main">
              <button class="close" @click="closePopup">×</button>
              <div class="p-content">
                <p>{{ currentItem.main.brand }}</p>
                <h3>{{ currentItem.main.name }}</h3>
                <p>{{ currentItem.main.price }}</p>
                <!-- 큰 이미지 -->
                <div class="main-img">
                  <img img :src="activeImage" :alt="activeColorName"/>
                  <p class="active-color">color: {{ activeColorName }}</p>
                </div>
                <div class="c-btns">
                  <button class="c-btn c-btn1">구매하기</button>
                  <button class="c-btn c-btn2">장바구니</button>
                </div>
                <!-- 썸네일 목록 -->
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
                      @click="activeImage = color.image; activeColorName = color.name"
                    />
                  </div>
                </div>
                <!-- 관련 상품 텍스트 정보 -->
                <div class="r-items">
                  <div
                    v-for="rel in currentItem.related"
                    :key="rel.id"
                    class="r-info"
                  >
                  <img :src="rel.image" :alt="rel.name">
                    <p>{{ rel.name }}</p>
                    <p>{{ rel.price }}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>