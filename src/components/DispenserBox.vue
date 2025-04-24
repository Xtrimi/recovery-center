<template>
  <rect x="535" y="538" width="577" height="126" fill="rgb(51, 51, 51)" />

  <path ref="panel" :d="closedD" fill="rgb(170, 170, 170)" pointer-events="none">
    <animate
      id="animD"
      attributeName="d"
      dur="0.8s"
      fill="freeze"
      calcMode="spline"
      keyTimes="0; 0.25; 0.5; 0.75; 1"
      keySplines="0 0 0.58 1; 0 0 0.58 1; 0 0 0.58 1; 0 0 0.58 1"
      :values="[closedD, openD, closedD, backD, closedD].join(';')"
    />

    <animate
      id="animFill"
      attributeName="fill"
      dur="0.8s"
      fill="freeze"
      calcMode="spline"
      keyTimes="0; 0.25; 0.5; 0.75; 1"
      keySplines="0 0 0.58 1; 0 0 0.58 1; 0 0 0.58 1; 0 0 0.58 1"
      values="rgb(170,170,170); rgb(190,190,190); rgb(170,170,170); rgb(150,150,150); rgb(170,170,170)"
    />
  </path>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const position = { X: 535, Y: 538 }
const size = { X: 577, Y: 126 }
const skewOut = { X: 120, Y: size.Y * 0.9 }
const skewIn = { X: 0, Y: size.Y * 0.1 }

const closedD = computed(
  () => `
  M${position.X},${position.Y}
  L${position.X + size.X},${position.Y}
  L${position.X + size.X},${position.Y + size.Y}
  L${position.X},${position.Y + size.Y}
  Z`,
)

const openD = computed(
  () => `
  M${position.X},${position.Y}
  L${position.X + size.X},${position.Y}
  L${position.X + size.X + skewOut.X},${position.Y + size.Y - skewOut.Y}
  L${position.X - skewOut.X},${position.Y + size.Y - skewOut.Y}
  Z`,
)

const backD = computed(
  () => `
  M${position.X},${position.Y}
  L${position.X + size.X},${position.Y}
  L${position.X + size.X + skewIn.X},${position.Y + size.Y - skewIn.Y}
  L${position.X - skewIn.X},${position.Y + size.Y - skewIn.Y}
  Z`,
)

const panel = ref<SVGPathElement | null>(null)
let animD: SVGAnimateElement | null = null
let animFill: SVGAnimateElement | null = null
//TODO refactor this
onMounted(() => {
  if (panel.value) {
    animD = panel.value.querySelector('#animD')
    animFill = panel.value.querySelector('#animFill')
  }
})

function flip() {
  if (animD && animFill) {
    animD.beginElement()
    animFill.beginElement()
  }
}

defineExpose({ flip })
</script>
