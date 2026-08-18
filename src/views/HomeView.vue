<script setup>
import TheWelcome from '../components/TheWelcome.vue'



import Navbars from '../components/Navigation.vue'
import BottomNav from '../components/BottomNav.vue'

</script>

<template>
       <Navbars   />
        <div class="max-w-md mx-auto min-h-screen pb-24">

   

    <!-- Continue Card -->
    <div class="mx-6 mt-[80px]  bg-gradient-to-r from-green-500 to-sky-500 rounded-3xl p-6 text-white shadow-xl">

        <p class="opacity-80 text-sm">
            Continue Learning
        </p>

        <h2 class="text-2xl font-bold mt-2">
            🇬🇧 English B2
        </h2>

        <p class="mt-2 opacity-90">
            Lesson 24 / 30
        </p>

        <div class="w-full h-3 bg-white/30 rounded-full mt-5">

            <div class="w-4/5 h-full bg-white rounded-full"></div>

        </div>

        <button class="mt-6 w-full bg-white text-green-600 font-semibold py-3 rounded-2xl">
            ▶ Continue
        </button>

    </div>

    <!-- Daily Goal -->
    <div class="mx-6 mt-8">

        <div class="flex justify-between mb-2">

            <h3 class="font-semibold text-slate-700">
                Daily Goal
            </h3>

            <span class="text-green-600 font-semibold">
                18 / 25 XP
            </span>

        </div>

        <div class="w-full h-3 bg-slate-200 rounded-full">

            <div class="w-3/4 h-full rounded-full bg-gradient-to-r from-green-500 to-sky-500"></div>

        </div>

    </div>
    <!-- Languages -->
    <div class="mx-6 mt-8">

        <h3 class="font-bold text-lg mb-4">
            Choose Language
        </h3>

        <div class="grid grid-cols-2 gap-4">

          <router-link to="english">

          <button
            class="group relative flex flex-col items-center  transition-all duration-300 hover:-translate-y-1"
            :class="active === 'home' ? 'text-[black]' : 'text-slate-800'"
            @click="active='home'"
        >
            <div class="bg-white w-[200px] p-[30px] rounded-3xl
shadow-[0_8px_25px_rgba(0,0,0,0.18)]
hover:shadow-[0_12px_35px_rgba(0,0,0,0.28)]
hover:-translate-y-1
duration-300">
                <div class="text-5xl ml-[45px]">
                    <img src="/use.jpg" alt="" width="50" height="50">
                </div>

                <p class="mt-3 font-semibold">English</p>
                
            </div>

        </button>
        </router-link>

        <router-link to="turkish">
            <button
            class="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
            :class="active === 'home' ? 'text-[black]' : 'text-slate-800'"
            @click="active='home'"
        >
           
                <div  class="bg-white w-[200px] p-[30px] rounded-3xl
shadow-[0_8px_25px_rgba(0,0,0,0.18)]
hover:shadow-[0_12px_35px_rgba(0,0,0,0.28)]
hover:-translate-y-1
duration-300">
                <div class="text-5xl ml-[50px]">
                    <img src="/turkiya.jpg" alt="" width="50" height="50">
                </div>
                <p class="mt-3 font-semibold">Turkish</p>
            </div>
           

        </button>

        </router-link>
        
            
         <button
            class="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
            :class="active === 'home' ? 'text-[black]' : 'text-slate-800'"
            @click="active='home'"
        >
           
                <div  class="bg-white w-[200px] p-[30px] rounded-3xl
shadow-[0_8px_25px_rgba(0,0,0,0.18)]
hover:shadow-[0_12px_35px_rgba(0,0,0,0.28)]
hover:-translate-y-1
duration-300">
                <div class="text-5xl ml-[50px]">
                    <img src="/korea.jpg" alt="" width="50" height="50">
                </div>
                <p class="mt-3 font-semibold">Korean</p>
            </div>
           

        </button>
           
        <button
            class="group relative flex flex-col items-center  transition-all duration-300 hover:-translate-y-1"
            :class="active === 'home' ? 'text-[black]' : 'text-slate-800'"
            @click="active='home'"
        >
           
                <div  class="bg-white w-[200px] p-[30px] rounded-3xl
shadow-[0_8px_25px_rgba(0,0,0,0.18)]
hover:shadow-[0_12px_35px_rgba(0,0,0,0.28)]
hover:-translate-y-1
duration-300">
                <div class="text-5xl ml-[50px]">
                    <img src="/arabic.jpg" alt="" width="50" height="50">
                </div>
                <p class="mt-3 font-semibold">Arabic</p>
            </div>
           

        </button>

            

        </div>

        

    </div>

    <!-- Challenge -->
    <div class="mx-6 mt-8 bg-white rounded-3xl p-5 shadow">

        <div class="flex justify-between items-center">

            <div>

                <h3 class="font-bold">
                    🔥 Daily Challenge
                </h3>

                <p class="text-slate-500 mt-1 text-sm">
                    Complete today's listening lesson
                </p>

            </div>

            <span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                +50 XP
            </span>

        </div>

        <button class="mt-5 w-full bg-green-500 text-white py-3 rounded-2xl font-semibold">
            Start Challenge
        </button>

    </div>

    <!-- Popular -->
    <div class="mx-6 mt-8">

        <div class="flex justify-between">

            <h3 class="font-bold text-lg">
                Popular Courses
            </h3>

            <span class="text-sky-500">
                See all
            </span>

        </div>

        <div class="space-y-4 mt-4">

            <div class="bg-white rounded-3xl shadow p-5 flex items-center justify-between">

                <div>

                    <h4 class="font-semibold">
                        IELTS Preparation
                    </h4>

                    <p class="text-slate-500 text-sm mt-1">
                        ⭐⭐⭐⭐⭐ • 10 Lessons
                    </p>

                </div>

                <div class="text-4xl">
                    📘
                </div>

            </div>

            <div class="bg-white rounded-3xl shadow p-5 flex items-center justify-between">

                <div>

                    <h4 class="font-semibold">
                        English for IT
                    </h4>

                    <p class="text-slate-500 text-sm mt-1">
                        ⭐⭐⭐⭐⭐ • 14 Lessons
                    </p>

                </div>

                <div class="text-4xl">
                    💻
                </div>

            </div>

        </div>

    </div>
<BottomNav />
</div>




<!-- <section class="bg-[#0F172A] py-24">

    <div class="mx-auto w-[1140px] px-6">

        <h2 class="text-center text-4xl font-bold text-white">

            Everything you need

        </h2>

        <p class="mt-4 text-center text-gray-400">

            One platform for learning.

        </p>

        <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            <div class="rounded-3xl border border-white/10 bg-white/5 p-8">

                <div class="text-5xl">📚</div>

                <h3 class="mt-6 text-2xl font-semibold text-white">

                    Vocabulary

                </h3>

                <p class="mt-4 text-gray-400">

                    Memorize words with AI.

                </p>

            </div>

            <div class="rounded-3xl border border-white/10 bg-white/5 p-8">

                <div class="text-5xl">🎧</div>

                <h3 class="mt-6 text-2xl font-semibold text-white">

                    Listening

                </h3>

                <p class="mt-4 text-gray-400">

                    Real conversations by level.

                </p>

            </div>

            <div class="rounded-3xl border border-white/10 bg-white/5 p-8">

                <div class="text-5xl">🤖</div>

                <h3 class="mt-6 text-2xl font-semibold text-white">

                    AI Teacher

                </h3>

                <p class="mt-4 text-gray-400">

                    Grammar and sentence analysis.

                </p>

            </div>

        </div>

    </div>

</section> -->

</template>

<script>
import { ref } from "vue"

const active = ref("home")
</script>