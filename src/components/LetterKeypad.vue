<template>
  <div class="key-container">
    <div v-for="(row, rowIndex) in keyRows" :key="rowIndex">
      <LetterKey v-for="(key, keyIndex) in row" :key="keyIndex" :letter="key" class="key-row" />
    </div>
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
      keyRows: [
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        ['I', 'J', 'K', 'L', 'M', 'N'],
        ['O', 'P', 'Q', 'R', 'S', 'T'],
        ['U', 'V', 'W', 'X', 'Y', 'Z'],
      ],
    }
  },
}
</script>

<style scoped>
.key-container {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.key-row {
  display: flex;
  gap: 1px;
  margin-bottom: 1px;
}
</style>
