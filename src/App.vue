<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@use '@/assets/scss/_font.scss';
@import '@/assets/scss/_colors.scss';

body {
  color: $primary-color;
  font-size: font.$super-big;
}
</style>
