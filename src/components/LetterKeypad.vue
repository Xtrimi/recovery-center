<template>
  <text class="input-display" x="1420" y="670" text-anchor="middle" dominant-baseline="middle">
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
    const keyButtons = ref<InstanceType<typeof LetterKey>[]>([])

    function addLetter(letter: string) {
      userInput.value += letter
    }

    async function tryAgain() {
      for (const letter of userInput.value) {
        const keyButton = keyButtons.value.find((obj) => obj.$props.letter == letter)

        if (keyButton) {
          console.log('!')
          keyButton.glow('rgba(0, 0, 255, 0.2)')
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      }
    }

    function submit() {
      userInput.value = ':)'
    }

    return { userInput, keyButtons, addLetter, tryAgain, submit }
  },
}
</script>

<style scoped>
.input-display {
  font-family: 'Eurostile';
  font-size: 48px;
  fill: green;
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
