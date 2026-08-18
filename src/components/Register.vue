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
          Create Account
        </h1>

        <p class="text-gray-500 mt-2">
          Start your English learning journey
        </p>
      </div>

      <!-- Register Card -->
      <div class="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-gray-100">

        <form @submit.prevent="registerUser" class="space-y-5">

          <!-- Username -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>

            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                👤
              </span>

              <input
                v-model="form.username"
                type="text"
                placeholder="Enter your username"
                class="w-full h-13 pl-11 pr-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                required
              />
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Phone number
            </label>

            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                📱
              </span>

              <input
                v-model="form.phone"
                type="tel"
                placeholder="+998901234567"
                class="w-full h-13 pl-11 pr-4 rounded-2xl border border-gray-200 bg-gray-50 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                required
              />
            </div>

            <p class="text-xs text-gray-400 mt-2 ml-1">
              Example: +998901234567
            </p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔒
              </span>

              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a password"
                class="w-full h-13 pl-11 pr-12 rounded-2xl border border-gray-200 bg-gray-50 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                required
                minlength="6"
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {{ showPassword ? "🙈" : "👁️" }}
              </button>
            </div>

            <p class="text-xs text-gray-400 mt-2 ml-1">
              Minimum 6 characters
            </p>
          </div>

          <!-- Error -->
          <div
            v-if="error"
            class="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600"
          >
            {{ error }}
          </div>

          <!-- Success -->
          <div
            v-if="success"
            class="rounded-2xl bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-600"
          >
            {{ success }}
          </div>

          <!-- Register Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full h-13 rounded-2xl bg-indigo-600 text-white font-bold text-base shadow-lg shadow-indigo-200 transition active:scale-[0.98] hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">
              Create Account
            </span>

            <span v-else>
              Creating account...
            </span>
          </button>

        </form>

        <!-- Login -->
        <div class="flex items-center gap-3 my-6">
          <div class="h-px bg-gray-100 flex-1"></div>

          <span class="text-xs text-gray-400">
            OR
          </span>

          <div class="h-px bg-gray-100 flex-1"></div>
        </div>

        <p class="text-center text-sm text-gray-500">
          Already have an account?

          <button
            type="button"
            @click="goToLogin"
            class="text-indigo-600 font-semibold ml-1"
          >
            Login
          </button>
        </p>

      </div>

      <!-- Footer -->
      <p class="text-center text-xs text-gray-400 mt-6 px-5">
        By creating an account, you agree to our Terms and Privacy Policy.
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const router = useRouter()

const form = ref({
  username: "",
  phone: "",
  password: "",
})

const loading = ref(false)
const error = ref("")
const success = ref("")
const showPassword = ref(false)

const registerUser = async () => {

  error.value = ""
  success.value = ""

  if (!form.value.username.trim()) {
    error.value = "Username kiriting."
    return
  }

  if (!form.value.phone.trim()) {
    error.value = "Telefon raqamingizni kiriting."
    return
  }

  if (form.value.password.length < 6) {
    error.value = "Parol kamida 6 ta belgidan iborat bo'lishi kerak."
    return
  }

  loading.value = true

  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/Register/",
      {
        username: form.value.username,
        phone: form.value.phone,
        password: form.value.password,
      }
    )

    console.log(response.data)

    success.value = "Ro'yxatdan o'tish muvaffaqiyatli! 🎉"

    // USERNAME NI SAQLAYMIZ
    localStorage.setItem("username", form.value.username)

    form.value = {
      username: "",
      phone: "",
      password: "",
    }

    setTimeout(() => {
      router.push("/")
    }, 1200)

  } catch (err) {

    console.log(err)

    if (err.response?.data?.errors) {

      const errors = err.response.data.errors

      if (errors.username) {
        error.value = errors.username[0]
      }

      else if (errors.phone) {
        error.value = errors.phone[0]
      }

      else if (errors.password) {
        error.value = errors.password[0]
      }

      else {
        error.value = "Ma'lumotlarni tekshirib qayta urinib ko'ring."
      }

    }

    else {
      error.value = "Server bilan bog'lanib bo'lmadi."
    }

  }

  finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push("/")
}
</script>