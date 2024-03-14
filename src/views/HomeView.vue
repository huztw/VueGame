<script setup lang="ts"></script>

<template>
  <main>
    <div>
      <RouterLink to="/go-fish" custom v-slot="{ navigate }">
        <button type="button" class="btn btn-primary btn-lg" @click="navigate" role="link">
          記憶力測驗遊戲
        </button>
      </RouterLink>
    </div>
  </main>
</template>
