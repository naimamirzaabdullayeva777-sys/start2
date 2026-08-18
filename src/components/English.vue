<script setup>


import Navbars from '../components/Navigation.vue'

</script>

<template>
  <Navbars   />
     <div class="max-w-md mx-auto min-h-screen mt-[60px] pb-24">
        <div className="w-full min-h-screen bg-[#f8fafc] px-4 py-5">
<!-- 
  {/* Header */} -->
  <div className="mb-6">
    <p className="text-sm text-gray-500 mb-1">Welcome back 👋</p>

    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
      What do you want to learn today?
    </h1>

    <p className="text-sm text-gray-500 mt-2">
      Choose a skill and start improving your English.
    </p>
  </div>


  <!-- {/* Level */} -->
  <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 flex items-center gap-3">
    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
      B2
    </div>

    <div>
      <p className="text-xs text-gray-400">
        Your level
      </p>

      <h3 className="font-semibold text-gray-800">
        Upper Intermediate
      </h3>
    </div>
  </div>


  <!-- {/* Daily Progress */} -->
  <div className="grid grid-cols-2 gap-3 mb-7">

    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <p className="text-xs text-gray-500">
        Daily goal
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-1">
        35 / 60 min
      </h3>

      <div className="w-full h-2 bg-gray-100 rounded-full mt-3">
        <div className="w-[58%] h-full bg-indigo-500 rounded-full"></div>
      </div>
    </div>


    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <p className="text-xs text-gray-500">
        Streak 🔥
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-1">
        12 days
      </h3>

      <p className="text-xs text-gray-400 mt-2">
        Keep going!
      </p>
    </div>

  </div>


  <!-- {/* Section */} -->
  <div className="mb-4">
    <h2 className="text-xl font-bold text-gray-900">
      Start learning
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      Choose what you want to practice.
    </p>
  </div>


  <!-- {/* Learning Cards */} -->
  <div className="grid grid-cols-2 gap-3">


    <!-- {/* Reading */} -->
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:scale-95 transition">
      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
        📚
      </div>

      <h3 className="font-bold text-gray-900 mt-4">
        Reading
      </h3>

      <p className="text-xs text-gray-500 mt-1 leading-5">
        Read books and interesting stories.
      </p>
      <router-link to="reading">
        <button className="w-full mt-4 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-semibold">
        Start →
      </button>
      </router-link>
      
    </div>


    <!-- {/* Shadowing */} -->
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:scale-95 transition">
      <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">
        🎧
      </div>

      <h3 className="font-bold text-gray-900 mt-4">
        Shadowing
      </h3>

      <p className="text-xs text-gray-500 mt-1 leading-5">
        Listen and repeat like a native speaker.
      </p>

      <router-link to="shadowing">
        <button className="w-full mt-4 py-2.5 rounded-xl bg-purple-50 text-purple-600 text-xs font-semibold">
        Start →
        </button>
      </router-link>
      
    </div>


    <!-- {/* Listening */} -->
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:scale-95 transition">
      <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-2xl">
        👂
      </div>

      <h3 className="font-bold text-gray-900 mt-4">
        Listening
      </h3>

      <p className="text-xs text-gray-500 mt-1 leading-5">
        Improve your listening skills.
      </p>

      <router-link to="Listening">
        <button className="w-full mt-9 py-2.5 rounded-xl bg-green-50 text-green-600 text-xs font-semibold">
        Start →
      </button>
      </router-link>
      
    </div>


    <!-- {/* Movies */} -->
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:scale-95 transition">
      <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-2xl">
        🎬
      </div>

      <h3 className="font-bold text-gray-900 mt-4">
        Movies
      </h3>

      <p className="text-xs text-gray-500 mt-1 leading-5">
        Watch movies based on your level.
      </p>

      <router-link to="Movie">
        <button className="w-full mt-4 py-2.5 rounded-xl bg-orange-50 text-orange-600 text-xs font-semibold">
        Watch →
      </button>
      </router-link>
      
    </div>


    <!-- {/* Tests */} -->
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:scale-95 transition">
      <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-2xl">
        📝
      </div>

      <h3 className="font-bold text-gray-900 mt-4">
        Tests
      </h3>

      <p className="text-xs text-gray-500 mt-1 leading-5">
        Test your English level.
      </p>

      <router-link to="tests">
        <button className="w-full mt-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-xs font-semibold">
        Start →
      </button>
      </router-link>
      
    </div>


    <!-- {/* Speaking */} -->
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:scale-95 transition">
      <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center text-2xl">
        🗣️
      </div>

      <h3 className="font-bold text-gray-900 mt-4">
        Speaking
      </h3>

      <p className="text-xs text-gray-500 mt-1 leading-5">
        Practice speaking every day.
      </p>

      <router-link to="Speaking">
        <button className="w-full mt-4 py-2.5 rounded-xl bg-pink-50 text-pink-600 text-xs font-semibold">
        Practice →
      </button>
      </router-link>
      
    </div>


    <!-- {/* Vocabulary */} -->
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:scale-95 transition">
      <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center text-2xl">
        📖
      </div>

      <h3 className="font-bold text-gray-900 mt-4">
        Vocabulary
      </h3>

      <p className="text-xs text-gray-500 mt-1 leading-5">
        Learn new words and phrases.
      </p>

      <router-link to="Vocabulary">
        <button className="w-full mt-4 py-2.5 rounded-xl bg-yellow-50 text-yellow-600 text-xs font-semibold">
        Learn →
      </button>
      </router-link>
      
    </div>


    <!-- {/* Daily English */} -->
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:scale-95 transition">
      <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center text-2xl">
        📅
      </div>

      <h3 className="font-bold text-gray-900 mt-4">
        Daily English
      </h3>

      <p className="text-xs text-gray-500 mt-1 leading-5">
        Complete your daily tasks.
      </p>

      <router-link to="Chelange">
        <button className="w-full mt-4 py-2.5 rounded-xl bg-cyan-50 text-cyan-600 text-xs font-semibold">
        Start →
      </button>
      </router-link>
      
    </div>

  </div>


  <!-- {/* Continue Learning */} -->
  <div className="mt-6 bg-indigo-600 rounded-2xl p-5 text-white">

    <p className="text-sm text-indigo-200">
      Continue Learning
    </p>

    <h2 className="text-xl font-bold mt-1">
      🇬🇧 English B2
    </h2>

    <p className="text-sm text-indigo-200 mt-1">
      Lesson 24 / 30
    </p>

    <div className="w-full h-2 bg-indigo-400/40 rounded-full mt-4">
      <div className="w-[80%] h-full bg-white rounded-full"></div>
    </div>

    <button className="w-full mt-4 bg-white text-indigo-600 rounded-xl py-3 font-semibold text-sm">
      ▶ Continue Learning
    </button>

  </div>


  <!-- {/* To Do List */} -->
  <div className="mt-6 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">

    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="font-bold text-gray-900">
          Today's Tasks
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          2 of 4 completed
        </p>
      </div>

      <span className="text-xl">
        ✅
      </span>
    </div>


    <div className="space-y-3">

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          defaultChecked
          className="w-4 h-4 accent-indigo-600"
        />

        <span className="text-sm text-gray-500 line-through">
          Learn 10 new words
        </span>
      </label>


      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          defaultChecked
          className="w-4 h-4 accent-indigo-600"
        />

        <span className="text-sm text-gray-500 line-through">
          Listen to a podcast
        </span>
      </label>


      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          className="w-4 h-4 accent-indigo-600"
        />

        <span className="text-sm text-gray-700">
          Practice shadowing
        </span>
      </label>


      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          className="w-4 h-4 accent-indigo-600"
        />

        <span className="text-sm text-gray-700">
          Complete B2 test
        </span>
      </label>

    </div>

  </div>

</div>
    </div>
    
</template>