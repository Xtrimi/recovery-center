<template>
  <text class="input-display" x="1420" y="670" text-anchor="middle" dominant-baseline="middle">
    {{ inputDisplay }}
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
    const keyButtons = ref<InstanceType<typeof LetterKey>[]>([])
    const inputDisplay = ref('')

    let stateLocked = false
    let userInput = ''

    function addLetter(letter: string) {
      if (stateLocked) {
        return
      }

      const keyButton = keyButtons.value.find((obj) => obj.$props.letter == letter)
      keyButton!.glow('rgba(255, 255, 255, 0.2)')

      userInput += letter
      inputDisplay.value = userInput
    }

    async function tryAgain() {
      stateLocked = true

      inputDisplay.value = ''
      for (const letter of userInput) {
        const keyButton = keyButtons.value.find((obj) => obj.$props.letter == letter)
        keyButton!.glow('rgba(0, 0, 255, 0.2)')

        inputDisplay.value += letter

        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      stateLocked = false
    }

    function submit() {
      if (stateLocked) {
        return
      }

      //todo: lock this and whatever other thingsn eed to belocked, i only modified tryAgain
      inputDisplay.value = ':)'
    }

    return { inputDisplay, keyButtons, addLetter, tryAgain, submit }
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
