<script setup>
import Sidebar from './components/Sidebar.vue'
import HeaderNav from './components/HeaderNav.vue'
</script>

<template>
  <Sidebar />
  <HeaderNav />
  <router-view :key="$route.fullPath" />

</template>

