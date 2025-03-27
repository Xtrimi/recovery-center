<template>
  <div id="app">
    <div class="toggle-area" @click.stop="isKeypadVisible = true"></div>

    <div v-show="isKeypadVisible" class="keypad-container" ref="keypadContainer">
      <LetterKeypad ref="keypadRef" />
    </div>

    <button class="retry" @click="tryAgain"></button>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LetterKeypad from './components/LetterKeypad.vue'

export default {
  name: 'app',
  components: {
    LetterKeypad,
  },
  setup() {
    const isKeypadVisible = ref(false)
    const keypadContainer = ref<HTMLElement>()
    const keypadRef = ref<InstanceType<typeof LetterKeypad>>()

    function tryAgain() {
      keypadRef.value!.tryAgain()
    }

    function clickOutsideEvent(event: MouseEvent) {
      if (keypadContainer.value && !keypadContainer.value.contains(event.target as Node)) {
        isKeypadVisible.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', clickOutsideEvent)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickOutsideEvent)
    })

    return { isKeypadVisible, keypadContainer, keypadRef, tryAgain }
  },
}
</script>

<style scoped>
:global(body) {
  background: url('./assets/background.png') no-repeat center center fixed;
  background-size: cover;
}

.toggle-area {
  position: absolute;
  width: 20vw; /* ughhhh why doesnt it match up with backbround */
  height: 30vh;
  top: 60vh;
  left: 63vw;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.toggle-area:hover {
  background: rgba(255, 255, 255, 0.1);
}

.keypad-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  background: rgba(255, 255, 255, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 1em;
}

/*.retry {
  padding: 20px;
  border: none;
  border-radius: 50%;
}*/
.retry {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 200px;
}
</style>
