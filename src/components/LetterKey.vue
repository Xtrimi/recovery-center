<template>
  <rect
    ref="keyButton"
    :x="x"
    :y="y"
    rx="5"
    @click="glow('rgba(0, 0, 255, 0.2)')"
    class="letter-key"
  />
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  props: {
    letter: { type: String, required: true },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
  },
  setup() {
    const keyButton = ref<SVGRectElement>()

    function glow(color: string) {
      if (!keyButton.value) return

      keyButton.value.style.fill = color
      setTimeout(() => {
        keyButton.value!.style.fill = 'rgba(117, 117, 117, 0)'
      }, 200)
    }

    return { keyButton, glow }
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
  transition: all 0.3s ease;
}
</style>
