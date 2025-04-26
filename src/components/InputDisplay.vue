<template>
  <text
    class="input-display"
    ref="inputDisplay"
    :class="{ retry: props.isRetrying }"
    x="1424"
    y="480"
  >
    {{ props.displayText }}
  </text>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  displayText: string
  isRetrying: boolean
}

const props = defineProps<Props>()

const inputDisplay = ref<SVGTextElement>()

function forceTextReflow() {
  inputDisplay.value!.getBBox()
}

function glowText() {
  if (!inputDisplay.value) {
    return
  }

  const currentFill = inputDisplay.value.style.fill
  const fullAlphaFill = currentFill.replace(
    /rgba?\((\d+,\s*\d+,\s*\d+)(?:,\s*[\d.]+)?\)/,
    'rgba($1, 1)',
  )

  inputDisplay.value.style.transition = 'none'
  inputDisplay.value.style.fill = fullAlphaFill

  forceTextReflow()

  inputDisplay.value.style.transition = 'fill 0.3s ease'
  inputDisplay.value.style.fill = currentFill
}

defineExpose({
  glowText,
})
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

.input-display.retry {
  fill: rgba(116, 181, 255, 0.7);
}
</style>
