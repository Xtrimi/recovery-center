<template>
  <rect ref="keyButton" :x="x" :y="y" rx="5" class="letter-key" />
</template>

<script lang="ts">
import { ref } from 'vue'
import { Sound } from '@/utils/Sound'

export default {
  props: {
    letter: { type: String, required: true },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
  },
  setup(props) {
    const keyButton = ref<SVGRectElement>()
    const normalSfx = new Sound(`sfx/normal${props.letter}.wav`)
    const retrySfx = new Sound(`sfx/retry${props.letter}.wav`)

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
      glow('rgba(255, 255, 255, 0.4)')
    }

    function handleRetry() {
      retrySfx.play()
      glow('rgba(116, 181, 255, 0.4)')
    }

    normalSfx.load()
    retrySfx.load()

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
