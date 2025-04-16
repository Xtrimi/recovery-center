<template>
  <text class="input-display" x="1424" y="480" ref="inputDisplay">
    {{ displayedInput }}
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
      @click="handleClick(key)"
    />
  </g>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Sound } from '@/utils/Sound'
import LetterKey from './LetterKey.vue'

export default {
  components: {
    LetterKey,
  },
  data() {
    return {}
  },
  setup() {
    const keyRows = [
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      ['I', 'J', 'K', 'L', 'M', 'N'],
      ['O', 'P', 'Q', 'R', 'S', 'T'],
      ['U', 'V', 'W', 'X', 'Y', 'Z'],
    ]

    const keyButtons = ref<InstanceType<typeof LetterKey>[]>([])
    const inputDisplay = ref<SVGTextElement>()
    const displayedInput = ref('')

    const pressSfx = new Sound('sfx/press.wav')
    const dropSfx = new Sound('sfx/drop.wav')
    const successSfx = new Sound('sfx/success.wav')

    let stateLocked = false
    let userInput = ''

    function handleClick(letter: string) {
      if (stateLocked) {
        return
      }

      const keyButton = keyButtons.value.find((obj) => obj.$props.letter == letter)
      keyButton!.handleClick()

      userInput += letter
      displayedInput.value = userInput
    }

    async function tryAgain() {
      stateLocked = true

      inputDisplay.value!.style.fill = 'rgba(116, 181, 255, 0.7)'
      displayedInput.value = ''
      for (const letter of userInput) {
        const keyButton = keyButtons.value.find((obj) => obj.$props.letter == letter)
        keyButton!.handleRetry()

        displayedInput.value += letter

        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      stateLocked = false

      submit()
    }

    async function submit() {
      if (stateLocked) {
        return
      }

      if (userInput === '') {
        return
      }

      pressSfx.play()
      await new Promise((resolve) => setTimeout(resolve, 200)) // 0.5 second delay

      dropSfx.play()
      await new Promise((resolve) => setTimeout(resolve, 600)) // 0.5 second delay

      successSfx.play()
      displayedInput.value = ':-)'
      inputDisplay.value!.style.fill = 'rgba(54, 255, 104, 0.5)'
      userInput = ''
    }

    pressSfx.load()
    dropSfx.load()
    successSfx.load()

    return { keyRows, inputDisplay, displayedInput, keyButtons, handleClick, tryAgain, submit }
  },
}
</script>

<style scoped>
.input-display {
  font-family: 'OCR A Extended';
  font-size: 66px;
  fill: rgba(54, 255, 104, 0.5);
  text-align: center;
  transform: scaleY(1.4);
  dominant-baseline: middle;
  text-anchor: middle;
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
