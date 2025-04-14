<template>
  <rect ref="keyButton" :x="x" :y="y" rx="5" class="letter-key" />
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  props: {
    letter: { type: String, required: true },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
  },
  setup(props) {
    const keyButton = ref<SVGRectElement>()
    const normalSfx = new Audio(`sfx/normal${props.letter}.wav`)
    const retrySfx = new Audio(`sfx/retry${props.letter}.wav`)

    function forceReflow() {
      keyButton.value!.getBBox()
    }

    function glow(color: string) {
      keyButton.value!.style.transition = 'none'
      keyButton.value!.style.fill = color

      forceReflow()

      keyButton.value!.style.transition = 'fill 0.3s ease'
      keyButton.value!.style.fill = 'rgba(117, 117, 117, 0)'
    }

    function handleClick() {
      normalSfx.play()
      glow('rgba(255, 255, 255, 0.2)')
    }

    function handleRetry() {
      retrySfx.play()
      glow('rgba(0, 0, 255, 0.2)')
    }

    return { keyButton, handleClick, handleRetry }
  },
}
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
</style>
