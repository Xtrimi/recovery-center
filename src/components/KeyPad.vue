<template>
  <div class="key-container">
    <LetterKey v-for="letter in alphabet" :key="letter" :letter="letter" />
  </div>
</template>

<script lang="ts">
import LetterKey from './LetterKey.vue'

export default {
  components: {
    LetterKey,
  },
  data() {
    return {
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    }
  },
}
</script>

<style scoped>
.key-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: fit-content;
}
</style>
