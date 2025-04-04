<template>
  <button ref="keyButton" @click="glow('white')">{{ letter }}</button>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  props: {
    letter: { required: true, type: String },
  },
  setup() {
    const keyButton = ref<HTMLButtonElement>()

    function glow(color: string) {
      if (keyButton.value) {
        keyButton.value.style.backgroundColor = color
        keyButton.value.classList.add('fade-glow')
        console.log('glow')

        setTimeout(() => {
          keyButton.value!.classList.remove('fade-glow')
        }, 200)
      } else {
        console.log('no glow')
      }
    }

    return { keyButton, glow }
  },
}
</script>

<style scoped>
button {
  width: 80px;
  height: 100px;
  float: left;
  margin: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Eurostile', sans-serif;
  font-size: clamp(16px, 5vw, 40px);
}

button.fade-glow {
  background-color: transparent;
  transition: background-color 1s linear;
}
</style>
