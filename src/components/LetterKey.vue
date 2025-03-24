<template>
  <button :id="id">{{ letter }}</button>
</template>

<script lang="ts">
import { nanoid } from 'nanoid'

export default {
  props: {
    letter: { required: true, type: String },
  },
  data() {
    return {
      id: 'button-' + nanoid(),
    }
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

  font-size: clamp(16px, 5vw, 40px);
}
</style>
