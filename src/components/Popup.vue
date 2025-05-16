<template>
  <div class="popup-wrapper" @click="$emit('close')">
    <div class="popup-box" @click.stop>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.popup-wrapper {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.popup-box {
  background: #FFF9CE;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
.close-btn {
  margin-top: 1rem;
}
</style>
