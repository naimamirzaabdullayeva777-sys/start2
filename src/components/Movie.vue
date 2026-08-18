<script setup>
import { ref, computed, onMounted } from 'vue'

const movies = ref([])
const search = ref('')
const active = ref('All')

const categories = ['All', 'A1', 'A2', 'B1', 'B2']

const getMovie = async () => {
  try {
    const res = await fetch('https://start-production-c765.up.railway.app/movie/', { credentials: 'include' })
    const data = await res.json()

    movies.value = data
  } catch (error) {
    console.log('Movie yuklashda xato:', error)
  }
}

const filteredMovie = computed(() => {
  return movies.value.filter((movie) => {
    const searchMatch = movie.name
      ?.toLowerCase()
      .includes(search.value.toLowerCase())

    const levelMatch =
      active.value === 'All' ||
      movie.level === active.value

    return searchMatch && levelMatch
  })
})

onMounted(() => {
  getMovie()
})


import Navbars from '../components/Navigation.vue'

</script>

<template>
   <Navbars   />
  <main class=" mt-[100px] bg-[#f7f8fc] max-w-md mx-auto min-h-screen p-[20px] mt-[60px] pb-24">

    <!-- HEADER -->
    <section class="mb-6">
      <p class="text-sm font-medium text-indigo-500">
        Learn English with movies 🎬
      </p>

      <h1 class="mt-1 text-3xl font-bold text-gray-900">
        Movies
      </h1>

      <p class="mt-1 text-sm text-gray-500">
        Watch movies and improve your English
      </p>
    </section>


    <!-- FEATURED MOVIE -->
    <section
      v-if="movies.length > 0"
      class="relative mb-7 h-[390px] overflow-hidden rounded-[28px] bg-gray-900 shadow-lg"
    >

      <img
        :src="movies[0].image"
        :alt="movies[0].name"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
      ></div>

      <div class="absolute bottom-0 left-0 right-0 p-5 text-white">

        <span
          class="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold"
        >
          {{ movies[0].level }}
        </span>

        <h2 class="mt-3 text-2xl font-bold">
          {{ movies[0].name }}
        </h2>

        <p class="mt-2 line-clamp-2 text-sm leading-5 text-gray-200">
          {{ movies[0].description }}
        </p>

        <button
          class="mt-4 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-gray-900 transition active:scale-95"
        >
          <span class="text-lg">▶</span>
          Watch now
        </button>

      </div>
    </section>


    <!-- SEARCH -->
    <section class="mb-5">

      <div
        class="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100"
      >

        <span class="text-lg text-gray-400">
          🔍
        </span>

        <input
          v-model="search"
          type="text"
          placeholder="Search movie..."
          class="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />

      </div>

    </section>


    <!-- LEVEL FILTER -->
    <section
      class="mb-7 flex gap-2 overflow-x-auto pb-1"
      style="scrollbar-width: none;"
    >

      <button
        v-for="category in categories"
        :key="category"
        @click="active = category"
        class="shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition"
        :class="
          active === category
            ? 'bg-indigo-600 text-white shadow-md'
            : 'bg-white text-gray-600 ring-1 ring-gray-200'
        "
      >
        {{ category }}
      </button>

    </section>


    <!-- MOVIE TITLE -->
    <section class="mb-4 flex items-center justify-between">

      <h2 class="text-xl font-bold text-gray-900">
        Popular Movies
      </h2>

      <span class="text-xs text-gray-400">
        {{ filteredMovie.length }} movies
      </span>

    </section>


    <!-- MOVIE CARDS -->
    <section
      class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
    >

      <article
        v-for="movie in filteredMovie"
        :key="movie.id"
        class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition active:scale-[0.98]"
      >

        <!-- IMAGE -->
        <div class="relative aspect-[2/3] overflow-hidden">

          <img
            :src="movie.image"
            :alt="movie.name"
            class="h-full w-full object-cover"
          />

          <!-- LEVEL -->
          <span
            class="absolute left-2 top-2 rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-bold text-white"
          >
            {{ movie.level }}
          </span>

          <!-- PLAY -->
          <button
            class="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-indigo-600 shadow-lg"
          >
            ▶
          </button>

        </div>


        <!-- CARD INFO -->
        <div class="p-3">

          <h3
            class="line-clamp-1 text-sm font-bold text-gray-900"
          >
            {{ movie.name }}
          </h3>

          <p
            class="mt-1 line-clamp-2 text-xs leading-5 text-gray-500"
          >
            {{ movie.description }}
          </p>

          <button
            class="mt-3 w-full rounded-xl bg-indigo-50 py-2 text-xs font-bold text-indigo-600 transition active:bg-indigo-600 active:text-white"
          >
            Watch
          </button>

        </div>

      </article>

    </section>


    <!-- EMPTY -->
    <section
      v-if="filteredMovie.length === 0"
      class="py-16 text-center"
    >

      <div class="text-5xl">
        🎬
      </div>

      <h3 class="mt-4 text-lg font-bold text-gray-800">
        Movie topilmadi
      </h3>

      <p class="mt-1 text-sm text-gray-400">
        Boshqa nom yoki level qidirib ko‘ring
      </p>

    </section>

  </main>
</template>