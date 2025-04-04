<template>
  <text class="input-display" x="1400" y="700" text-anchor="middle" dominant-baseline="middle">
    {{ userInput }}
  </text>

  <g
    v-for="(row, rowIndex) in keyRows"
    :key="rowIndex"
    :transform="`translate(0 ${rowIndex * 56.8 + 743.8})`"
  >
    <LetterKey
      v-for="(key, keyIndex) in row"
      :key="keyIndex"
      :letter="key"
      :x="keyIndex * 46.27 + 1247.2"
      :y="0"
      ref="keyButtons"
      @click="addLetter(key)"
    />
  </g>
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

    function addLetter(letter: string) {
      userInput.value += letter
    }

    async function tryAgain() {
      const keyButtons = ref<InstanceType<typeof LetterKey>[]>([])

      for (const letter of userInput.value) {
        const keyButton = keyButtons.value.find((obj) => obj.$props.letter == letter)

        if (keyButton) {
          keyButton.glow('blue')
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      }
    }

    return { userInput, addLetter, tryAgain }
  },
}
</script>

<style scoped>
.input-display {
  font-family: 'Eurostile';
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
