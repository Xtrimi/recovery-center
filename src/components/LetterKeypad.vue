<template>
  <input type="text" class="input-display" v-model="userInput" readonly />
  <div class="key-container">
    <div v-for="(row, rowIndex) in keyRows" :key="rowIndex" class="key-row">
      <LetterKey
        v-for="(key, keyIndex) in row"
        :key="keyIndex"
        :letter="key"
        ref="keyButtons"
        @click="addLetter(key)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
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
  setup() {
    const userInput = ref('')
    const keyButtons = ref<InstanceType<typeof LetterKey>[]>([])

    function addLetter(letter: string) {
      userInput.value += letter
    }

    async function tryAgain() {
      for (const letter of userInput.value) {
        const keyButton = keyButtons.value.find((obj) => {
          return obj.$props.letter == letter
        })
        console.log(`trying to glow ${letter}`)
        if (keyButton) {
          keyButton.glow('blue')
        }
      }
    }

    return { userInput, addLetter, tryAgain }
  },
}
</script>

<style scoped>
.input-display {
  text-align: center;
}

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
