<template>
  <rect
    ref="keyButton"
    :x="x"
    :y="y"
    rx="5"
    class="letter-key"
    :class="{ glow: isGlowing }"
    :style="{ '--glow-color': glowColor }"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sound } from '@/utils/Sound'

interface Props {
  letter: string
  x: number
  y: number
}

const props = defineProps<Props>()

const isGlowing = ref(false)
const glowColor = ref('')

const normalSfx = new Sound(`sfx/normal${props.letter}.wav`)
const retrySfx = new Sound(`sfx/retry${props.letter}.wav`)

function glow(color: string) {
  glowColor.value = color
  isGlowing.value = true

  setTimeout(() => {
    isGlowing.value = false
  }, 300)
  /*keyButton.value!.style.transition = 'none'
  keyButton.value!.style.fill = color

  isGlowing.value = true

  keyButton.value!.style.transition = 'fill 0.3s ease'
  keyButton.value!.style.fill = 'rgba(117, 117, 117, 0)'*/
}

//TODO: handle the glowing and click emitting and yadda yadda
function handleClick() {
  normalSfx.play()
  glow('rgba(255, 255, 255, 0.4)')
}

function handleRetry() {
  retrySfx.play()
  glow('rgba(116, 181, 255, 0.4)')
}

defineExpose({
  handleClick,
  handleRetry,
})
</script>

<style scoped>
.letter-key {
  width: 40px;
  height: 50px;
  border-radius: 5px;

  pointer-events: auto;
  cursor: pointer;
  fill: rgba(117, 117, 117, 0);
  filter: blur(5px);
}

@keyframes glow {
  from {
    fill: var(--glow-color);
  }
  to {
    fill: rgba(117, 117, 117, 0);
  }
}

.letter-key.glow {
}
</style>
