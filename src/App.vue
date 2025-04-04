<template>
  <div id="wrapper" :class="{ zoomed: isZoomed }">
    <img src="@/assets/background.png" class="background" />

    <svg class="overlay" viewBox="0 0 2304 1296" preserveAspectRatio="xMidYMid slice">
      <circle title="go" cx="1736" cy="784" r="55" @click="submit()" />
      <rect title="retry" x="1700" y="867" width="73" height="62" @click="tryAgain" />
      <LetterKeypad ref="keypadRef" />
    </svg>
  </div>

  <button class="zoomer" @click="isZoomed = !isZoomed">
    <img v-if="!isZoomed" src="@/assets/zoom.svg" class="zoom-icon" />
    <img v-else src="@/assets/unzoom.svg" class="zoom-icon" />
  </button>
</template>

<script lang="ts">
import { ref } from 'vue'
import LetterKeypad from '@/components/LetterKeypad.vue'

export default {
  name: 'app',
  components: { LetterKeypad },
  setup() {
    const isZoomed = ref(false)
    const keypadRef = ref<InstanceType<typeof LetterKeypad>>()

    function tryAgain() {
      keypadRef.value!.tryAgain()
    }

    function submit() {
      console.log('Go button clicked')
    }

    return { isZoomed, keypadRef, tryAgain, submit }
  },
}
</script>

<style scoped>
#wrapper {
  position: fixed;
  transition: transform 0.5s ease;
  transform-origin: center center;
  top: 0;
  left: 0;
}

#wrapper.zoomed {
  transform: translate(calc((100% - 455vw) / 4.6), calc((100% - 410vh) / 4.6)) scale(2.3); /* im kinda just praying atp this isnt even consistent */
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.zoom-icon {
  width: 80%;
  height: 80%;
  object-fit: contain;
  filter: invert(12%) sepia(52%) saturate(683%) hue-rotate(226deg) brightness(95%) contrast(89%);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.overlay circle,
.overlay rect {
  pointer-events: auto;
  cursor: pointer;
  fill: transparent;
  filter: blur(5px);
  transition: fill 0.3s ease-in-out;
}

.overlay rect:hover {
  fill: rgba(255, 255, 255, 0.075);
}

.overlay circle:hover {
  fill: rgba(255, 255, 255, 0.2);
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
