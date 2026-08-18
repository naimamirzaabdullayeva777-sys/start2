<template>
    <!-- ================= BOTTOM NAVIGATION ================= -->

  <div
    class="fixed bottom-0 left-0 right-0
           bg-white border-t
           z-[9999]
           shadow-[0_-4px_15px_rgba(0,0,0,0.08)]"
  >

    <div
      class="max-w-md mx-auto
             flex justify-around
             relative
             z-[10000]"
    >

      <!-- HOME -->
      <RouterLink to="/">

        <button
          class="group relative z-[10001]
                 flex flex-col items-center
                 py-3 px-5
                 transition-all duration-300
                 hover:-translate-y-1"
          :class="
            active === 'home'
              ? 'text-green-600'
              : 'text-slate-500'
          "
          @click="active = 'home'"
        >

          <span class="text-2xl">
            🏠
          </span>

          <span class="text-xs font-semibold">
            Home
          </span>

          <span
            class="absolute -bottom-[1px]
                   h-1 bg-green-600
                   rounded-full
                   transition-all duration-300"
            :class="
              active === 'home'
                ? 'w-8'
                : 'w-0'
            "
          ></span>

        </button>

      </RouterLink>


      <!-- LEARN -->
      <RouterLink to="/learn">

        <button
          class="group relative z-[10001]
                 flex flex-col items-center
                 py-3 px-5
                 transition-all duration-300
                 hover:-translate-y-1"
          :class="
            active === 'learn'
              ? 'text-green-600'
              : 'text-slate-500'
          "
          @click="active = 'learn'"
        >

          <span class="text-2xl">
            📖
          </span>

          <span class="text-xs font-semibold">
            Learn
          </span>

          <span
            class="absolute -bottom-[1px]
                   h-1 bg-green-600
                   rounded-full
                   transition-all duration-300"
            :class="
              active === 'learn'
                ? 'w-8'
                : 'w-0'
            "
          ></span>

        </button>

      </RouterLink>


      <!-- QUIZ -->
      <RouterLink to="/Quiz">

        <button
          class="group relative z-[10001]
                 flex flex-col items-center
                 py-3 px-5
                 transition-all duration-300
                 hover:-translate-y-1"
          :class="
            active === 'quiz'
              ? 'text-green-600'
              : 'text-slate-500'
          "
          @click="active = 'quiz'"
        >

          <span class="text-2xl">
            🎯
          </span>

          <span class="text-xs font-semibold">
            Quiz
          </span>

          <span
            class="absolute -bottom-[1px]
                   h-1 bg-green-600
                   rounded-full
                   transition-all duration-300"
            :class="
              active === 'quiz'
                ? 'w-8'
                : 'w-0'
            "
          ></span>

        </button>

      </RouterLink>


      <!-- PROFILE -->
      <button
        class="group relative z-[10001]
               flex flex-col items-center
               py-3 px-5
               transition-all duration-300
               hover:-translate-y-1"
        :class="
          active === 'profile'
            ? 'text-green-600'
            : 'text-slate-500'
        "
        @click="active = 'profile'"
      >

        <span class="text-2xl">
          👤
        </span>

        <span class="text-xs font-semibold">
          Profile
        </span>

        <span
          class="absolute -bottom-[1px]
                 h-1 bg-green-600
                 rounded-full
                 transition-all duration-300"
          :class="
            active === 'profile'
              ? 'w-8'
              : 'w-0'
          "
        ></span>

      </button>

    </div>

  </div>
</template>



<script setup>
import { ref } from "vue"
import { RouterLink, RouterView } from "vue-router"

const username = ref(localStorage.getItem("username") || "")
const active = ref("home")

const logout = () => {
  if (confirm("Chiqmoqchimisiz?")) {
    localStorage.removeItem("username")
    username.value = ""
  }
}
</script>


<style>

nav {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

</style>