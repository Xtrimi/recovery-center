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
    <text class="input-display" ref="inputDisplay" :class="{ retry: isRetrying }" x="1424" y="480">
      {{ displayedInput }}
    </text>

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

const keyRows = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  ['I', 'J', 'K', 'L', 'M', 'N'],
  ['O', 'P', 'Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X', 'Y', 'Z'],
]

const inputDisplay = ref<SVGTextElement>()
const dispenserBox = ref<InstanceType<typeof DispenserBox>>()
const keyButtons = ref<InstanceType<typeof LetterKey>[]>([])
const displayedInput = ref('')
const isRetrying = ref(false)

const pressSfx = new Sound('sfx/press.wav')
const dropSfx = new Sound('sfx/drop.wav')
const successSfx = new Sound('sfx/success.wav')

let stateLocked = false
let userInput = ''

function forceTextReflow() {
  inputDisplay.value!.getBBox()
}

function glowText() {
  inputDisplay.value!.style.transition = 'none'
  inputDisplay.value!.style.fill = 'rgba(54, 255, 104, 1)'

  forceTextReflow()

  inputDisplay.value!.style.transition = 'fill 0.3s ease'
  inputDisplay.value!.style.fill = 'rgba(54, 255, 104, 0.5)'
}

function handleClick(letter: string) {
  if (stateLocked) {
    return
  }

  const keyButton = keyButtons.value.find((obj) => obj.$props.letter == letter)
  keyButton!.handleClick()

  userInput += letter
  displayedInput.value = userInput.slice(-9)
}

async function tryAgain() {
  if (stateLocked) {
    return
  }

  stateLocked = true
  isRetrying.value = true
  displayedInput.value = ''

  for (const letter of userInput) {
    const keyButton = keyButtons.value.find((obj) => obj.$props.letter == letter)
    keyButton!.handleRetry()

    displayedInput.value = (displayedInput.value + letter).slice(-9)

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
  await new Promise((resolve) => setTimeout(resolve, 100))

  glowText()
  dropSfx.play()
  dispenserBox.value!.flip()
  await new Promise((resolve) => setTimeout(resolve, 160))

  successSfx.play()

  isRetrying.value = false
  displayedInput.value = ':-)'
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

.input-display {
  font-family: 'OCR A Extended';
  font-size: 66px;
  fill: rgba(54, 255, 104, 0.5);
  text-align: center;
  transform: scaleY(1.4);
  dominant-baseline: middle;
  text-anchor: middle;
}

.input-display.retry {
  fill: rgba(116, 181, 255, 0.7);
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
