<template>
  <svg class="overlay" viewBox="0 0 2304 1296" preserveAspectRatio="xMidYMid slice">
    <InputDisplay ref="inputDisplay" :displayText="displayText" :isRetrying="isRetrying" />
    <circle class="indicator" :class="{ retry: isRetrying }" cx="1567.1" cy="843.3" r="35.5" />

    <circle class="interactable" title="go" cx="1736" cy="784" r="55" @click="submit(false)" />
    <rect
      class="interactable"
      title="retry"
      x="1700"
      y="867"
      width="73"
      height="62"
      @click="tryAgain"
    />

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
        ref="keyButtonRefs"
        class="interactable"
        @click="handlePress(key)"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
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

const keyButtonRefs = ref<InstanceType<typeof LetterKey>[]>([])
const dispenserBox = ref<InstanceType<typeof DispenserBox>>()
const inputDisplay = ref<InstanceType<typeof InputDisplay>>()

const displayText = ref('')
const isRetrying = ref(false)

const pressSfx = new Sound('sfx/press.wav')
const dropSfx = new Sound('sfx/drop.wav')
const successSfx = new Sound('sfx/success.wav')

const keyButtons = new Map<string, InstanceType<typeof LetterKey>>()

let userInput = ''
let lastUserInput = ''

onMounted(() => {
  for (const button of keyButtonRefs.value) {
    keyButtons.set(button.$props.letter, button)
    keyButtons.set(button.$props.letter.toLowerCase(), button)
  }

  addEventListener('keydown', handleKeyDown)
})

function handleKeyDown(event: KeyboardEvent) {
  switch (event.key) {
    case 'Enter':
      submit()
      break
    case 'Shift':
      tryAgain()
      break
    case 'Backspace':
      userInput = userInput.slice(0, -1)
      displayText.value = userInput.slice(-9)
      break
    default:
      if (event.key.length === 1) {
        handlePress(event.key)
      }
  }
}

function handlePress(letter: string) {
  if (isRetrying.value) {
    return
  }

  const keyButton = keyButtons.get(letter)
  if (keyButton !== undefined) {
    keyButton.handlePress()
  }

  userInput += letter
  displayText.value = userInput.slice(-9)
}

async function tryAgain() {
  if (lastUserInput.length == 0) {
    return
  }

  pressSfx.play()
  isRetrying.value = true
  displayText.value = ''

  let currentDisplay = ''
  for (let i = 0; i < lastUserInput.length; i++) {
    const letter = lastUserInput[i]
    const keyButton = keyButtons.get(letter)
    if (keyButton !== undefined) {
      keyButton.handleRetry()
    }

    displayText.value = (currentDisplay += letter).slice(-9)

    await new Promise((resolve) => setTimeout(resolve, 75))
  }

  submit(true)
}

async function submit(isAfterRetry = false) {
  if (!isAfterRetry) {
    if (userInput.length > 0) {
      lastUserInput = userInput
    }

    pressSfx.play()
  }
  userInput = ''

  await new Promise((resolve) => setTimeout(resolve, 150))

  dropSfx.play()
  inputDisplay.value!.glowText()
  dispenserBox.value!.flip()
  await new Promise((resolve) => setTimeout(resolve, 600))

  successSfx.play()

  isRetrying.value = false
  displayText.value = ':-)'
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

.indicator {
  fill: rgba(18, 108, 28, 1);
}

.indicator.retry {
  fill: rgb(36, 105, 180);
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
