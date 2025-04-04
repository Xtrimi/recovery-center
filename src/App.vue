<template>
  <img src="./assets/background.png" class="background" @click.stop="isKeypadVisible = false" />

  <svg class="overlay" viewBox="0 0 2304 1296" preserveAspectRatio="xMidYMid slice">
    <polygon
      title="keypad"
      points="1366,541 1478,541 1514,543 1551,547 1579,554 1608,570 1626,590 1636,617 1640,649 1645,682 1645,871 1636,930 1626,961 1606,981 1581,995 1555,1003 1492,1009 1347,1009 1284,1003 1256,993 1235,977 1217,956 1207,928 1203,895 1201,702 1203,649 1211,604 1221,588 1237,572 1254,560 1274,550 1311,543"
      @click.stop="isKeypadVisible = true"
    />
    <circle title="go" cx="1736" cy="784" r="55" @click.stop="submit()" />
    <rect title="retry" x="1700" y="867" width="73" height="62" @click.stop="tryAgain" />
  </svg>

  <div v-show="isKeypadVisible" class="keypad-container" ref="keypadContainer">
    <LetterKeypad ref="keypadRef" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import LetterKeypad from './components/LetterKeypad.vue'

export default {
  name: 'app',
  components: { LetterKeypad },
  setup() {
    const isKeypadVisible = ref(false)
    const keypadContainer = ref<HTMLElement>()
    const keypadRef = ref<InstanceType<typeof LetterKeypad>>()

    function tryAgain() {
      keypadRef.value!.tryAgain()
    }

    function submit() {
      console.log('Go button clicked')
    }

    return { isKeypadVisible, keypadContainer, keypadRef, tryAgain, submit }
  },
}
</script>

<style scoped>
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

.overlay polygon,
.overlay circle,
.overlay rect {
  pointer-events: auto;
  cursor: pointer;
  fill: transparent;
  filter: blur(5px);
  transition: fill 0.3s ease-in-out;
}

.overlay polygon:hover,
.overlay rect:hover {
  fill: rgba(255, 255, 255, 0.075);
  filter: blur(5px);
}

.overlay circle:hover {
  fill: rgba(255, 255, 255, 0.2);
  filter: blur(5px);
}

.keypad-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  background: rgba(37, 37, 37, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0;
}
</style>
