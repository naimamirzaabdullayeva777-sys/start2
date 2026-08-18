<script setup>
import { ref, onMounted, computed } from 'vue'

const search = ref('')
const active = ref('All')

const categories = ['All', 'B1']
const Listening = ref([])

const currentAudio = ref(null)
const currentId = ref(null)
const isPlaying = ref(false)
const progress = ref(0)

const getListening = async () => {
  try {
    const res = await fetch('https://start-production-c765.up.railway.app/Listening/', { credentials: 'include' })
    Listening.value = await res.json()
  } catch (err) {
    console.log(err)
  }
}

const filteredList = computed(() => {
  return Listening.value.filter(item => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchLevel =
      active.value === 'All' || item.level === active.value

    return matchSearch && matchLevel
  })
})


/* =========================
   AUDIO
========================= */

const playAudio = (item) => {

  // Agar boshqa audio ishlayotgan bo'lsa
  if (currentAudio.value && currentId.value !== item.id) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
  }

  // Shu audio allaqachon tanlangan bo'lsa
  if (currentId.value === item.id && currentAudio.value) {

    if (currentAudio.value.paused) {
      currentAudio.value.play()
      isPlaying.value = true
    } else {
      currentAudio.value.pause()
      isPlaying.value = false
    }

    return
  }

  // Yangi audio
  const audio = new Audio(item.audio)

  currentAudio.value = audio
  currentId.value = item.id
  isPlaying.value = true
  progress.value = 0

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      progress.value =
        (audio.currentTime / audio.duration) * 100
    }
  })

  audio.addEventListener('ended', () => {
    progress.value = 0
    isPlaying.value = false
    currentId.value = null
    currentAudio.value = null
  })

  audio.addEventListener('error', (err) => {
    console.log('Audio error:', err)
    isPlaying.value = false
  })

  audio.play()
}

onMounted(getListening)

import Navbars from '../components/Navigation.vue'

  
</script>

<template>
    <Navbars   />
<div class="max-w-[450px] mt-[50px] mx-auto min-h-screen bg-[#F8F5FD] pb-24">

  <!-- HEADER -->
  <div class="px-4 pt-8">
    <h1 class="text-[34px] font-bold text-[#13235B]">
      Listening
    </h1>

    <p class="text-gray-500 text-sm mt-1 leading-5">
      Listen and improve your English skills.
    </p>

    <!-- Search -->
    <div class="mt-5 relative">
      <input
        v-model="search"
        placeholder="Search..."
        class="w-full bg-white rounded-full py-3 pl-11 pr-4 shadow outline-none text-sm"/>

      <span class="absolute left-4 top-3 text-gray-400">🔍</span>
    </div>

    <!-- Category -->
    <div class="flex gap-2 overflow-x-auto mt-4 no-scrollbar pb-1">
      <button
        v-for="c in categories"
        :key="c"
        @click="active=c"
        :class="active==c ? 'bg-purple-600 text-white':'bg-white text-gray-600'"
        class="px-4 py-2 rounded-full text-xs whitespace-nowrap shadow">
        {{ c }}
      </button>
    </div>

    <!-- Featured -->
    <div class="bg-[#F0EBFC] rounded-[26px] p-3 mt-5">

      <img
        src="/cappa.jpg"
        class="w-full h-40 object-cover rounded-2xl"/>

      <span class="bg-purple-200 text-purple-700 text-[10px] px-2 py-1 rounded mt-3 inline-block">
        FEATURED
      </span>

      <h2 class="font-bold text-lg mt-2 text-[#13235B]">
        Morning Conversation
      </h2>

      <p class="text-gray-500 text-xs mt-1">
        Friendly daily English conversation.
      </p>

      <div class="flex items-center justify-between mt-3 text-xs text-gray-600">
        <span>B1</span>
        <span>05:32</span>
        <span>🎧</span>
      </div>

      <div class="flex items-center gap-3 mt-4">
        <button class="w-11 h-11 rounded-full bg-purple-600 text-white">
          ▶
        </button>

        <div class="flex-1 h-1 bg-gray-300 rounded-full">
          <div class="w-1/3 h-1 bg-purple-600 rounded-full"></div>
        </div>

        <span class="text-xs">1.0x</span>
      </div>
    </div>
  </div>

  <!-- LIST -->
  <div class="px-4 mt-6">

    <div class="flex justify-between items-center mb-3">
      <h2 class="font-bold text-lg">All Listening</h2>
      <span class="text-purple-600 text-sm">See all</span>
    </div>

    <div
      v-for="item in filteredList"
      :key="item.id"
      class="bg-white rounded-2xl p-2 mb-3 flex gap-3 shadow-sm">

      <img
        :src="item.img"
        class="w-24 h-24 rounded-xl object-cover"/>

      <div class="flex-1 flex flex-col justify-between">

        <div>
          <h3 class="font-semibold text-[15px] text-[#13235B] leading-5">
            {{item.title}}
          </h3>

          <p class="text-[11px] text-gray-500 mt-1">
            English listening practice
          </p>
        </div>

        <div class="flex items-center justify-between">
          <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px]">
            {{item.level}}
          </span>

          <span class="text-xs text-gray-500">
            {{item.time}}
          </span>
        </div>

      </div>

      <!-- PLAY BUTTON -->
      <button
        @click="playAudio(item)"
        class="text-purple-600 text-lg px-1">

        {{ currentId === item.id && isPlaying ? '⏸' : '▶' }}

      </button>

    </div>

    <!-- AUDIO PROGRESS -->
    <div
      v-if="currentId"
      class="mt-2 mb-4 px-1">

      <div class="w-full h-1 bg-gray-300 rounded-full overflow-hidden">

        <div
          class="h-1 bg-purple-600 rounded-full transition-all duration-100"
          :style="{ width: progress + '%' }">
        </div>

      </div>

    </div>

    <!-- TIP -->
    <div class="bg-[#EEE7FC] rounded-3xl p-4 mt-5 flex items-center gap-3">

      <div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl">
        🎯
      </div>

      <div>
        <h3 class="font-bold text-[#13235B]">Listening Tip</h3>

        <p class="text-xs text-gray-500">
          Listen twice and repeat important sentences.
        </p>
      </div>

    </div>

  </div>
</div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar{
  display:none;
}
</style>