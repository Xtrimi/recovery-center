<template>
  <div id="app">
    <KeyPad />
  </div>
</template>

<script lang="ts">
import KeyPad from './components/KeyPad.vue'

export default {
  name: 'app',
  components: {
    KeyPad,
  },
}
</script>

<style scoped>
:global(body) {
  background: url('./assets/background.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
