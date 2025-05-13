<script setup>
import Sidebar from './components/Sidebar.vue'
import HeaderNav from './components/HeaderNav.vue'
import BottomButton from './components/BottomButton.vue'
</script>

<template>
  <Sidebar />
  <HeaderNav />
  <router-view :key="$route.fullPath" />
  <BottomButton />
</template>

