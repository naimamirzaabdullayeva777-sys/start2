<script setup>
import { ref, onMounted } from 'vue'
import BottomNav from '../components/BottomNav.vue'

const Shadow = ref([])
const videoRefs = ref([])

const getShadow = async () => {
  try {
    const res = await fetch('https://start-production-c765.up.railway.app/Shadow/', { credentials: 'include' })
    Shadow.value = await res.json()
  } catch (e) {
    console.log(e)
  }
}

const playVideo = (i) => {
  const video = videoRefs.value[i]
  if (video) {
    video.play()
    video.controls = true
  }
}

const openFull = (i) => {
  const video = videoRefs.value[i]
  if (video && video.requestFullscreen) {
    video.requestFullscreen()
  }
}

onMounted(getShadow)

import Navbars from '../components/Navigation.vue'
import BottomNav from './BottomNav.vue'

</script>

<template>

<Navbars />

  <div class="mt-[85px] max-w-md mx-auto min-h-screen bg-[#F6F2FB] pb-24 px-3">

    <!-- Header -->
    <div class="py-5">
      <h1 class="text-3xl font-bold text-[#0F1E5A] border-l-4 border-purple-600 pl-3">
        Shadowing
      </h1>
      <p class="text-gray-500 text-sm mt-2 pl-4">
        Listen and repeat to improve your pronunciation.
      </p>
    </div>

    <!-- Video Cards -->
    <div class="space-y-5">

      <div
        v-for="(item,index) in Shadow"
        :key="item.id"
        class="bg-white rounded-[28px] p-4 shadow-lg shadow-purple-100 border border-purple-100"
      >

        <!-- Video -->
        <div class="relative">

          <video
  :src="item.video"
  controls
  class="w-full h-[520px] rounded-xl bg-black"
></video>

        </div>

        <!-- Text -->
        <div class="mt-4">
          <h2 class="text-xl font-bold text-[#0F1E5A]">
            {{ item.name }}
          </h2>

          <p class="text-gray-500 text-sm mt-1 leading-6">
            Listen carefully and repeat exactly like the speaker to improve pronunciation.
          </p>
        </div>

        <!-- Info -->
        <div class="flex gap-2 flex-wrap mt-4">

          <span class="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-medium">
            📊 {{ item.level }}
          </span>

          <span class="px-3 py-1 rounded-xl bg-green-50 text-green-700 text-xs font-medium">
            🕐 {{ item.minute }}
          </span>

          <span class="px-3 py-1 rounded-xl bg-yellow-50 text-yellow-700 text-xs font-medium">
            ⭐ New
          </span>

        </div>

        <!-- Buttons -->
       

      </div>

    </div>

    <!-- Tips -->
    <div class="mt-6 rounded-[26px] border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-5">
      <div class="flex gap-4 items-start">
        <div class="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl">
          🎯
        </div>

        <div>
          <h3 class="font-bold text-[#0F1E5A] text-lg">
            Tips for better shadowing
          </h3>

          <p class="text-sm text-gray-500 mt-1 leading-6">
            Listen carefully, repeat aloud, copy pronunciation, intonation and rhythm.
          </p>
        </div>
      </div>
    </div>

  </div>
  <BottomNav />
</template>