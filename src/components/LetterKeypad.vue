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
    const inputDisplay = ref('')

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
      inputDisplay.value = userInput
    }

    async function tryAgain() {
      stateLocked = true

      inputDisplay.value = ''
      for (const letter of userInput) {
        const keyButton = keyButtons.value.find((obj) => obj.$props.letter == letter)
        keyButton!.handleRetry()

        inputDisplay.value += letter

        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      stateLocked = false
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
      inputDisplay.value = ':)'
      userInput = ''
    }

    pressSfx.load()
    dropSfx.load()
    successSfx.load()

    return { keyRows, inputDisplay, keyButtons, handleClick, tryAgain, submit }
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
