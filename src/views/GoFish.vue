<script setup lang="ts">
import GameStart from '../components/GameStart.vue'
import CardItem from '../components/CardItem.vue'
import { ref, computed } from 'vue'
import type { Card } from '../types/Card'

// 隨機產生一個介於 min 和 max 之間的整數
const getRandomInt = (max: number, min: number = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// 隨機產生一張卡牌名稱
function randomCard() {
  const suits = ['黑桃', '紅心', '菱形', '梅花']
  const id = getRandomInt(suits.length - 1)
  const number = getRandomInt(13, 1)

  return `${suits[id]}${number}`
}

// 打亂陣列
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

// 產生新的卡牌陣列
function newCards(number: number) {
  let array: Card[] = []
  for (let index = 0; index < number; index++) {
    const card = randomCard()
    for (let j = 0; j < 2; j++) {
      array.push({
        id: array.length,
        name: card,
        open: false,
        match: false
      })
    }
  }

  shuffleArray(array)
  return array
}

let cards = ref<Card[]>([])
const openedCards = ref<Card[]>([])
let isGameStarted = ref<boolean>(false)
let timing = ref<number>(0)
let intervalID: number | undefined = undefined
const gameSuccess = computed(() => cards.value.filter((card) => card.match === false).length === 0)

// 翻開卡牌
function openCard(id: number) {
  if (isGameStarted.value && openedCards.value.length < 2) {
    const findCard = cards.value.find((card) => card.id === id)
    if (findCard) {
      findCard.open = true
      openedCards.value.push(findCard)
    }

    if (openedCards.value.length === 2) {
      setTimeout(() => {
        if (isOpenedCardMatch()) {
          setOpenedCard('match', true)

          if (gameSuccess.value) {
            stopTiming()
          }
        } else {
          setOpenedCard('open', false)
        }
      }, 700)
    }
  }
}

// 根據給定的屬性名稱和值設定已翻開卡牌的屬性
function setOpenedCard(key: 'open' | 'match', value: any) {
  for (let index = 0; index < openedCards.value.length; index++) {
    const findCard = cards.value.find((card) => card.id === openedCards.value[index].id)

    if (findCard) {
      findCard[key] = value
    }
  }

  openedCards.value = []
}

// 檢查已翻開卡牌是否匹配
function isOpenedCardMatch() {
  let target = null
  let match = false

  for (let index = 0; index < openedCards.value.length; index++) {
    const currentCardName = openedCards.value[index].name
    if (target === null) {
      target = currentCardName
      match = true
    } else if (currentCardName !== target) {
      match = false
    }
  }

  return match
}

// 開始遊戲
function startGame() {
  resetTiming()
  cards.value = newCards(getRandomInt(7, 3))
  isGameStarted.value = true
  startTiming()
}

// 計時
function startTiming() {
  intervalID = setInterval(() => timing.value++, 1000)
}

// 停止計時
function stopTiming() {
  clearInterval(intervalID)
}

// 重製計時
function resetTiming() {
  if (intervalID !== undefined) {
    stopTiming()
  }

  timing.value = 0
}
</script>

<template>
  <GameStart
    :isGameStarted="isGameStarted"
    :timing="timing"
    :cardsCount="cards.length"
    @startGame="startGame"
  />
  <div v-if="cards.length > 0" class="container">
    <div v-if="gameSuccess" class="row justify-content-center">
      <div class="col-12 align-self-center text-center">
        <h1 class="text-danger">恭喜破關!</h1>
      </div>
    </div>
    <div v-else class="row">
      <div
        v-for="card in cards"
        :key="card.id"
        class="col-sm-3 greetings m-2 d-flex align-items-center justify-content-center text-center"
      >
        <CardItem :card="card" :isGameStarted="isGameStarted" @toggleOpen="openCard(card.id)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.greetings {
  height: 200px;
  width: 200px;
}
</style>
