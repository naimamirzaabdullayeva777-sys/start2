<template>
  <!-- ================= HEADER ================= -->
  <div class="max-w-md mx-auto">

    <nav
      class="flex bg-white p-[10px] shadow-md justify-between m-auto
             fixed top-0 left-1/2 -translate-x-1/2
             w-full max-w-md
             z-[9999]
             border-bottom-rounded"
    >

      <div>
        <img
          class="h-[50px] object-cover"
          src="/learnmee.jpg"
          alt="LearnMee"
        >
      </div>

      <div class="flex items-center">
        <span class="text-2xl mr-1">👤</span>

        <RouterLink
          v-if="!username"
          to="/Register"
          class="font-semibold text-gray-700"
        >
          Kirish
        </RouterLink>

        <button
          v-else
          @click="logout"
          class="font-semibold text-gray-700"
        >
          {{ username }}
        </button>
      </div>

    </nav>

  </div>
</template>

<script setup>
import { ref } from "vue"
import { RouterLink } from "vue-router"

const username = ref(localStorage.getItem("username") || "")

const logout = () => {

  const confirmLogout = confirm("Logout qilishni istaysizmi?")

  if (confirmLogout) {
    localStorage.removeItem("username")
    username.value = ""

    // Login/Register sahifasiga o'tadi
    window.location.href = "/Login"
  }
}
</script>

<style>
nav {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>