<template>
  <Navbars />
<div class=" bg-slate-100">
  <div class="max-w-sm mx-auto bg-white  mt-[70px] mb-[90px]">

    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-5 rounded-b-[30px] text-white">
      <span class="bg-white/20 px-3 py-1 rounded-full text-xs">
        Speaking • B1
      </span>

      <h1 class="text-2xl font-bold mt-3">
        Describe this picture
      </h1>

      <img
        src="/speaking.jpg"
        class="w-full h-44 object-cover rounded-2xl mt-4"
      />
    </div>

    <!-- Body -->
    <div class="p-4">
      <div class="bg-slate-50 rounded-3xl p-5">

        <p class="text-center text-gray-400 text-sm">
          You have 60 seconds
        </p>

        <h2 class="text-center text-4xl font-bold my-3">
          {{ timer }}
        </h2>

        <div class="flex justify-center mb-4">
          <button
            @click="toggle"
            :class="recording ? 'bg-red-500 animate-pulse' : 'bg-blue-600'"
            class="w-24 h-24 rounded-full text-white text-4xl"
          >
            🎤
          </button>
        </div>

        <h3 class="font-bold text-lg">
          What is happening in this picture?
        </h3>

        <p class="text-gray-500 text-sm mt-2 leading-6">
          Talk about the people, the place and what they are doing.
        </p>

        <button
          @click="toggle"
          :class="recording ? 'bg-red-500' : 'bg-blue-600'"
          class="w-full py-4 rounded-2xl text-white font-bold mt-6"
        >
          {{ recording ? 'Stop Recording' : 'Start Recording' }}
        </button>

      </div>
    </div>

  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const recording = ref(false)
const seconds = ref(0)
let interval = null

const timer = computed(() => {
  const m = String(Math.floor(seconds.value / 60)).padStart(2,'0')
  const s = String(seconds.value % 60).padStart(2,'0')
  return `${m}:${s}`
})

const toggle = () => {
  if (!recording.value) {
    recording.value = true
    interval = setInterval(() => {
      seconds.value++
      if (seconds.value >= 60) stop()
    },1000)
  } else {
    stop()
  }
}

const stop = () => {
  recording.value = false
  clearInterval(interval)
}

import Navbars from '../components/Navigation.vue'
</script>