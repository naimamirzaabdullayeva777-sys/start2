<template>
  <div class="min-h-screen bg-[#f7f8fc] flex items-center justify-center px-4 py-8">

    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="text-center mb-7">
        <div
          class="w-16 h-16 mx-auto rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200"
        >
          <span class="text-3xl">📚</span>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 mt-4">
          Welcome Back
        </h1>

        <p class="text-gray-500 mt-2">
          Continue your English learning journey
        </p>
      </div>


      <!-- Login Card -->
      <div
        class="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-gray-100"
      >

        <form @submit.prevent="login" class="space-y-5">

          <!-- Username -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>

            <div class="relative">
              <span
                class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                👤
              </span>

              <input
                v-model="username"
                type="text"
                placeholder="Enter your username"
                class="w-full h-13 pl-11 pr-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                required
              />
            </div>
          </div>


          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div class="relative">
              <span
                class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                🔒
              </span>

              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full h-13 pl-11 pr-12 rounded-2xl border border-gray-200 bg-gray-50 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                required
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {{ showPassword ? "🙈" : "👁️" }}
              </button>
            </div>
          </div>


          <!-- Error -->
          <div
            v-if="error"
            class="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600"
          >
            {{ error }}
          </div>


          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full h-13 rounded-2xl bg-indigo-600 text-white font-bold text-base shadow-lg shadow-indigo-200 transition active:scale-[0.98] hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">
              Login
            </span>

            <span v-else>
              Logging in...
            </span>
          </button>

        </form>


        <!-- Register -->
        <div class="flex items-center gap-3 my-6">
          <div class="h-px bg-gray-100 flex-1"></div>

          <span class="text-xs text-gray-400">
            OR
          </span>

          <div class="h-px bg-gray-100 flex-1"></div>
        </div>


        <p class="text-center text-sm text-gray-500">
          Don't have an account?

          <button
            type="button"
            @click="goToRegister"
            class="text-indigo-600 font-semibold ml-1"
          >
            Create Account
          </button>
        </p>

      </div>


      <!-- Footer -->
      <p class="text-center text-xs text-gray-400 mt-6 px-5">
        Learn English. Practice every day. 🚀
      </p>

    </div>
  </div>
</template>


<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const username = ref("")
const password = ref("")

const loading = ref(false)
const error = ref("")
const showPassword = ref(false)


const login = async () => {

  error.value = ""

  if (!username.value.trim()) {
    error.value = "Username kiriting."
    return
  }

  if (!password.value) {
    error.value = "Parol kiriting."
    return
  }

  loading.value = true

  try {

    const res = await fetch(
      "https://start-production-c765.up.railway.app/login/",
      {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username: username.value,
          password: password.value
        })
      }
    )

    const data = await res.json()

    console.log(data)

    if (res.ok) {

      // Navbar uchun username saqlanadi
      localStorage.setItem(
        "username",
        username.value
      )

      // Backend qaytargan ma'lumot ham saqlanadi
      localStorage.setItem(
        "user",
        JSON.stringify(data)
      )

      // Bosh sahifaga
      router.push("/")

    } else {

      error.value =
        data.error ||
        "Username yoki parol noto'g'ri."

    }

  } catch (err) {

    console.log(err)

    error.value =
      "Server bilan bog'lanib bo'lmadi."

  } finally {

    loading.value = false

  }
}


const goToRegister = () => {
  router.push("/Register")
}
</script>