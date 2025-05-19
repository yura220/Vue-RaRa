<template>
  <div v-if="isVisible" class="scratch-wrapper">
    <div class="scratch-border">
      <div class="scratch-box">
        <div class="box-top">
          <img src="../assets/scratch1.svg" alt="복권이미지">
          <div class="title-hint">
            <h2> 오늘의 기분 예보를 긁어보세요!</h2>
            <p>"기분 맑음, 행운 확률 100% 행운의 스크래치 복권!"</p>
          </div>
        </div>

        <div class="scratch-area">
          <canvas
            ref="canvas"
            :class="{ cleared: isCleared, 'fade-out': isClearing }"
            @mousedown="handleStart"
            @mousemove="handleMove"
            @mouseup="handleEnd"
            @mouseleave="handleEnd"
            @touchstart="handleStart"
            @touchmove="handleMove"
            @touchend="handleEnd"
          ></canvas>

          <div class="content">
            <h3>{{ selectedMessage.title }}</h3>
            <p>{{ selectedMessage.desc }}</p>
          </div>
        </div>

        <p class="explanation">본 이벤트는 ID당 1회 참여 가능합니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const messages = [
  { title: "원피스 할인 쿠폰 2000원 할인", desc: "햇살 가득한 하루, 가벼운 원피스 하나 어때요?" },
  { title: "니트 할인 쿠폰 2000원 할인", desc: "흐린 날엔 부드러운 니트가 마음을 감싸줄 거예요." },
  { title: "우산 할인 쿠폰 2000원 할인", desc: "비 오는 날, 귀여운 우산과 함께 기분 전환 완료!" },
  { title: "머플러 할인 쿠폰 2000원 할인", desc: "눈 내리는 오늘, 포근한 머플러로 따뜻하게." },
  { title: "전 상품 할인 쿠폰 4000원 할인", desc: "오늘은 당신만의 색을 입는 날이에요. 밝게 빛나봐요!" },
  { title: "전 상품 할인 쿠폰 3000원 할인", desc: "좋아하는 음악과 어울리는 옷을 골라볼까요?" },
  { title: "전 상품 할인 쿠폰 2000원 할인", desc: "몽글몽글할 땐, 파스텔 컬러로 마음까지 부드럽게." },
  { title: "전 상품 할인 쿠폰 2000원 할인", desc: "잔잔한 바람처럼 여유로운 스타일을 입어보세요." },
  { title: "배송비 할인 쿠폰 2000원 할인", desc: "행운 배송 중! 당신에게 아이템이 찾아오고 있어요." },
  { title: "전 상품 할인 쿠폰 5000원 할인", desc: "오늘의 기분 예보: 설렘 70%, 기대 30%, 쇼핑 100%!" }
];

const selectedMessage = ref(messages[Math.floor(Math.random() * messages.length)]);
const isVisible = ref(true);
const isCleared = ref(false);
const isClearing = ref(false);
const isHintVisible = ref(true);

const canvas = ref(null);
let ctx;
let isDrawing = false;
let lastPos = null;
let scratchCheckCounter = 0;

function getPos(e) {
  const rect = canvas.value.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
  return { x, y };
}

function handleStart(e) {
  console.log("🟢 handleStart fired", e.type);
  isHintVisible.value = false;
  isDrawing = true;
  lastPos = getPos(e);
}

function handleMove(e) {
  if (!isDrawing || isCleared.value) return;
  draw(e);
}

function handleEnd() {
  isDrawing = false;
  lastPos = null;
}

function draw(e) {
  console.log('drawing...');
  if (!ctx) return;

  ctx.globalCompositeOperation = 'destination-out';
  ctx.strokeStyle = 'rgba(0,0,0,1)';

  const pos = getPos(e);
  if (!lastPos) lastPos = pos;

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 70;
  ctx.beginPath();
  ctx.moveTo(lastPos.x, lastPos.y);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();

  lastPos = pos;
  scratchCheckCounter++;
  if (scratchCheckCounter % 10 === 0) checkScratchRatio();
}

function checkScratchRatio() {
  const pixels = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height).data;
  const total = pixels.length / 4;
  let cleared = 0;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) cleared++;
  }

  if (cleared / total > 0.6 && !isCleared.value) {
    isClearing.value = true;
    setTimeout(() => {
      isCleared.value = true;
    }, 800);
  }
}

onMounted(async () => {
  await nextTick();
  console.log("✅ onMounted 실행됨");

  const c = canvas.value;
  if (!c) return;

  const dpr = window.devicePixelRatio || 1;
  c.width = 550 * dpr;
  c.height = 100 * dpr;
  c.style.width = '550px';
  c.style.height = '100px';

  ctx = c.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  ctx.fillStyle = '#999';
  ctx.fillRect(0, 0, 550, 100);

  ctx.globalCompositeOperation = 'destination-out';
});
</script>

<style scoped>
canvas {
  position: absolute;
  z-index: 2;
  pointer-events: auto !important;
  width: 550px;
  height: 100px;
  border-radius: 70px;
  cursor: pointer;
}
.content {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  width: 550px;
  height: 100px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 70px;
}
</style>
