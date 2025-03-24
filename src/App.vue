<template>
  <div id="app">
    <div class="toggle-area" @click.stop="isKeypadVisible = true"></div>

    <div v-if="isKeypadVisible" class="keypad-container" ref="keypadContainer">
      <LetterKeypad />
    </div>
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
    const keypadContainer = ref<HTMLElement | null>(null)

    const clickOutsideEvent = (event: MouseEvent) => {
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

    return { isKeypadVisible, keypadContainer }
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
  width: 228px;
  height: 218px;
  top: 61%;
  left: 62%;
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
</style>
