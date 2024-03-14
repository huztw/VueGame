<script setup lang="ts">
import type { Card } from '../types/Card'

const props = defineProps<{ card: Card; isGameStarted: boolean }>()
const emit = defineEmits(['toggleOpen'])

const emitToggleOpen = () => {
  if (props.isGameStarted) {
    emit('toggleOpen')
  }
}
</script>

<template>
  <div
    @click="emitToggleOpen"
    v-show="!card.open"
    :class="[isGameStarted ? 'bg-info' : 'bg-secondary', 'h-100', 'w-100']"
  ></div>
  <div
    v-show="card.open && !card.match"
    :class="[isGameStarted ? 'text-primary' : 'text-secondary', 'fs-1']"
  >
    {{ card.name }}
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
}

.greetings {
  height: 200px;
  width: 200px;
}
</style>
