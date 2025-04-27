<template>
  <svg class="overlay" viewBox="0 0 2304 1296" preserveAspectRatio="xMidYMid slice">
    <circle class="interactable" title="go" cx="1736" cy="784" r="55" @click="submit" />
    <rect
      class="interactable"
      title="retry"
      x="1700"
      y="867"
      width="73"
      height="62"
      @click="tryAgain"
    />
    <InputDisplay ref="inputDisplay" :displayText="displayText" :isRetrying="isRetrying" />

    <DispenserBox ref="dispenserBox" />
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
        class="interactable"
        @click="handleClick(key)"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sound } from '@/utils/Sound'
import LetterKey from './LetterKey.vue'
import DispenserBox from './DispenserBox.vue'
import InputDisplay from './InputDisplay.vue'

const keyRows = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  ['I', 'J', 'K', 'L', 'M', 'N'],
  ['O', 'P', 'Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X', 'Y', 'Z'],
]

const dispenserBox = ref<InstanceType<typeof DispenserBox>>()
const keyButtons = ref<InstanceType<typeof LetterKey>[]>([])
const inputDisplay = ref<InstanceType<typeof InputDisplay>>()

const displayText = ref('')
const isRetrying = ref(false)

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
  displayText.value = userInput.slice(-9)
}

async function tryAgain() {
  if (stateLocked) {
    return
  }

  stateLocked = true
  isRetrying.value = true
  displayText.value = ''

  for (const letter of userInput) {
    const keyButton = keyButtons.value.find((obj) => obj.$props.letter == letter)
    keyButton!.handleRetry()

    displayText.value = (displayText.value + letter).slice(-9)

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
  await new Promise((resolve) => setTimeout(resolve, 150))

  dropSfx.play()
  inputDisplay.value!.glowText()
  dispenserBox.value!.flip()
  await new Promise((resolve) => setTimeout(resolve, 600))

  successSfx.play()

  isRetrying.value = false
  displayText.value = ':-)'
  userInput = ''
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.interactable {
  pointer-events: auto;
  cursor: pointer;
  fill: transparent;
  filter: blur(5px);
  transition: fill 0.3s ease-in-out;
}

.interactable:hover {
  fill: rgba(255, 255, 255, 0.1);
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
