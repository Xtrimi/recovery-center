<template>
  <rect x="535" y="538" width="577" height="126" fill="rgb(51, 51, 51)" />

  <path ref="box" :d="closedD" fill="rgb(170, 170, 170)">
    <animate
      id="animD"
      attributeName="d"
      dur="0.7s"
      begin="indefinite"
      fill="freeze"
      calcMode="spline"
      keyTimes="0; 0.25; 0.5; 0.75; 1"
      keySplines="0 0 0.58 1; 0 0 0.58 1; 0 0 0.58 1; 0 0 0.58 1"
      :values="[closedD, openD, closedD, backD, closedD].join(';')"
    />

    <animate
      id="animFill"
      attributeName="fill"
      dur="0.7s"
      begin="indefinite"
      fill="freeze"
      calcMode="spline"
      keyTimes="0; 0.25; 0.5; 0.75; 1"
      keySplines="0 0 0.58 1; 0 0 0.58 1; 0 0 0.58 1; 0 0 0.58 1"
      values="rgb(170,170,170); rgb(190,190,190); rgb(170,170,170); rgb(150,150,150); rgb(170,170,170)"
    />
  </path>

  <defs>
    <clipPath id="floorClip">
      <rect x="0" y="580" width="2304" height="1296" fill="white" />
    </clipPath>
  </defs>

  <g :clip-path="hasBounced ? undefined : 'url(#floorClip)'">
    <Transition name="drop">
      <g v-if="curObject" :key="curObject.id">
        <image
          :href="curObject.src"
          :x="830 - curObject.width / 2"
          :y="1220 - curObject.height"
          :width="curObject.width"
          :height="curObject.height"
        />
      </g>
    </Transition>
  </g>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { parseInput } from '@/utils/parseInput'
import { getScale } from '@/utils/getScale'
import { getSource } from '@/utils/getSource'

interface Object {
  id: number
  src: string
  width: number
  height: number
}

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

const box = ref<SVGPathElement | null>(null)
const curObject = ref<Object | null>()
const hasBounced = ref(false)

let bounceTimeout: number | null = null
let animD: SVGAnimateElement | null = null
let animFill: SVGAnimateElement | null = null
let objectId = 0

onMounted(() => {
  animD = box.value!.querySelector('#animD')
  animFill = box.value!.querySelector('#animFill')
})

function flip() {
  animD!.beginElement()
  animFill!.beginElement()
}

function preloadImage(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.src = src
  })
}

async function dropObject(input: string) {
  input = parseInput(input)

  const imageSrc = getSource(input)
  if (imageSrc === null) {
    return
  }

  if (bounceTimeout) {
    clearTimeout(bounceTimeout)
  }

  curObject.value = null
  hasBounced.value = false

  const { width, height } = await preloadImage(imageSrc)
  const scale = getScale(input)

  curObject.value = {
    id: objectId++,
    src: imageSrc,
    width: width * scale,
    height: height * scale,
  }

  bounceTimeout = setTimeout(() => {
    hasBounced.value = true
  }, 150)
}

defineExpose({ flip, dropObject })
</script>

<style scoped>
.drop-enter-active {
  animation:
    fall 0.15s ease-in,
    bounce 0.2s 0.15s ease-out;
}

@keyframes fall {
  0% {
    transform: translateY(-400px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
}
</style>
