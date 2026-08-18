<script setup>
import { ref, onMounted, computed } from 'vue'
import Navbars from '../components/Navigation.vue'
import BottomNav from './BottomNav.vue'

const books = ref([])
const selectedLevel = ref('All')
const showLevels = ref(false)

const levels = ['All', 'A1', 'A2', 'B1', 'B2', 'C1']

const getBooks = async () => {
  try {
    const response = await fetch('https://start-production-c765.up.railway.app/api/books/', { credentials: 'include' })

    if (!response.ok) throw new Error('API ishlamayapti')

    books.value = await response.json()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  selectedLevel.value = 'All'
  getBooks()
})

const filteredBooks = computed(() => {
  if (selectedLevel.value === 'All') return books.value

  return books.value.filter(
    book => book.level?.toUpperCase() === selectedLevel.value
  )
})

const chooseLevel = (level) => {
  selectedLevel.value = level
  showLevels.value = false
}
</script>

<template>
  <Navbars />

  <div class="max-w-md mx-auto min-h-screen mt-[80px] pb-24 px-2">

    <div class="flex items-center gap-2">
      <button class="text-xl text-gray-700">←</button>
      <h1 class="text-xl font-bold text-gray-800">Reading</h1>
    </div>

    <p class="mt-2 max-w-[300px] text-[11px] leading-4 text-gray-500">
      Improve your vocabulary and grammar by reading amazing books.
    </p>

    <img src="/books.png" alt="books" class="rounded-[15px] p-[10px]" />

    <!-- Level -->
    <div class="relative mb-3 mt-8 flex items-center justify-between">

      <h2 class="text-base font-bold text-gray-800">
        {{ selectedLevel === 'All' ? 'All Books' : selectedLevel + ' Level Books' }}
      </h2>

      <button
        @click="showLevels = !showLevels"
        class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[10px] text-gray-600 shadow-sm"
      >
        Level: {{ selectedLevel }}
        <span :class="{ 'rotate-180': showLevels }" class="transition">⌄</span>
      </button>

      <div
        v-if="showLevels"
        class="absolute right-0 top-12 z-50 w-24 rounded-xl border bg-white shadow-lg"
      >
        <button
          v-for="level in levels"
          :key="level"
          @click="chooseLevel(level)"
          class="w-full px-3 py-2 text-left text-sm hover:bg-blue-50"
          :class="selectedLevel === level ? 'font-semibold text-blue-600' : 'text-gray-700'"
        >
          {{ level }}
        </button>
      </div>

    </div>

    <!-- Books -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">

      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="w-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200"
      >
        <img
          :src="book.image"
          :alt="book.name"
          class="h-[200px] w-full object-cover"
        />

        <div class="p-2">
          <h3 class="min-h-[20px] text-[10px] font-bold leading-3 text-gray-800">
            {{ book.name }}
          </h3>

          <p class="text-[9px] leading-3 text-gray-500">
            {{ book.description }}
          </p>

          <p class="mt-1 text-[9px] font-bold text-blue-500">
            📌 Level {{ book.level }}
          </p>

          <p class="mt-1 text-[9px] text-gray-500">
            📖 {{ book.pages }} pages
          </p>

          <a
            :href="book.pdf"
            class="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-blue-50 py-1.5 text-[9px] font-medium text-blue-600 shadow-lg shadow-purple-200 transition hover:scale-105"
          >
            Read →
          </a>
        </div>
      </div>

    </div>

    <div
      v-if="filteredBooks.length === 0"
      class="py-10 text-center text-sm text-gray-400"
    >
      Bu levelda kitob topilmadi.
    </div>

  </div>

  <BottomNav />
</template>