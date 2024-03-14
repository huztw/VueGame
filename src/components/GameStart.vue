<script setup lang="ts">
defineProps<{
  isGameStarted: boolean
  timing: number
  cardsCount: number
}>()
</script>

<template>
  <div class="container">
    <div class="row align-items-center justify-content-center">
      <div class="col-4">
        <button type="button" class="btn btn-primary btn-lg" @click="$emit('startGame')">
          {{ isGameStarted ? '新的一局' : '遊戲開始' }}
        </button>
      </div>
      <div class="col-4">
        <span class="green fs-1 text-nowrap">卡牌: {{ cardsCount }}</span>
      </div>
      <div class="col-4">
        <span class="green fs-1 text-nowrap">耗時: {{ timing }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

.greetings {
  width: 80vw;
}

.greetings h1 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1 {
    text-align: left;
  }
}
</style>
