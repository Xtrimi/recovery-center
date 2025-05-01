<template>
  <div id="wrapper" :class="{ zoomed: isZoomed, zooming: isZooming }">
    <img src="@/assets/background.png" class="background" />
    <svg class="overlay" viewBox="0 0 2304 1296" preserveAspectRatio="xMidYMid slice">
      <DispenserBox ref="dispenserBox" />
      <LetterKeypad @dropObject="dropObject" @flip="flip" />
    </svg>
  </div>

  <button class="zoomer" @click="toggleZoom">
    <img v-if="!isZoomed" src="@/assets/zoom.svg" class="zoom-icon" />
    <img v-else src="@/assets/unzoom.svg" class="zoom-icon" />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LetterKeypad from '@/components/LetterKeypad.vue'
import DispenserBox from '@/components/DispenserBox.vue'

const dispenserBox = ref<InstanceType<typeof DispenserBox>>()
const isZoomed = ref(false)
const isZooming = ref(false)

function dropObject(input: string) {
  dispenserBox.value!.dropObject(input)
}

function flip() {
  dispenserBox.value!.flip()
}

function toggleZoom() {
  isZoomed.value = !isZoomed.value
  isZooming.value = true

  setTimeout(() => {
    isZooming.value = false
  }, 500)
}
</script>

<style scoped>
#wrapper {
  position: fixed;
  transform-origin: center center;
  top: 0;
  left: 0;
}

#wrapper.zoomed {
  transform: translate(calc((100% - 455vw) / 4.6), calc((100% - 420vh) / 4.6)) scale(2.3);
}

#wrapper.zooming {
  transition: transform 0.5s ease;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.zoom-icon {
  width: 80%;
  height: 80%;
  object-fit: contain;
  filter: invert(12%) sepia(52%) saturate(683%) hue-rotate(226deg) brightness(95%) contrast(89%);
}

.zoomer {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  border: none;
  background: rgba(53, 37, 70, 0.3);
  cursor: pointer;
  border-radius: 4px;
}
</style>
