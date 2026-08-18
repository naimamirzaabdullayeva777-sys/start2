<template>
  <Navbars />
<div class="bg-slate-100">
  <div class="max-w-sm mx-auto bg-white mt-[70px] mb-[70px]">

    <div class="bg-gradient-to-r from-blue-700 to-purple-600 p-5 rounded-b-[30px] text-white">
      <p class="text-sm opacity-80">Vocabulary</p>
      <h1 class="text-2xl font-bold">Card {{ page }}</h1>
    </div>

    <div class="p-4 space-y-4">

      <div>
        <label class="font-semibold text-sm">English Word</label>
        <input v-model="english"
          class="w-full mt-2 p-4 rounded-2xl border outline-none"
          placeholder="Beautiful" />
      </div>

      <div>
        <label class="font-semibold text-sm">Uzbek Meaning</label>
        <input v-model="uzbek"
          class="w-full mt-2 p-4 rounded-2xl border outline-none"
          placeholder="Chiroyli" />
      </div>

      <div>
        <label class="font-semibold text-sm">Example Sentence</label>
        <textarea v-model="example"
          rows="3"
          class="w-full mt-2 p-4 rounded-2xl border outline-none"
          placeholder="She is a beautiful girl." />
      </div>

      <div>
        <label class="font-semibold text-sm">Opposite Word</label>
        <input v-model="opposite"
          class="w-full mt-2 p-4 rounded-2xl border outline-none"
          placeholder="Ugly" />
      </div>

      <button
        @click="nextCard"
        class="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">
        Next →
      </button>

    </div>

  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'

const page = ref(1)

const english = ref('')
const uzbek = ref('')
const example = ref('')
const opposite = ref('')

// Bubble Pop uchun saqlaydi
function saveWord(word) {
  if (!word.trim()) return

  const saved = JSON.parse(localStorage.getItem('learned_words') || '[]')
  const upper = word.trim().toUpperCase()

  if (!saved.includes(upper)) {
    saved.push(upper)
    localStorage.setItem('learned_words', JSON.stringify(saved))
  }
}
import Navbars from '../components/Navigation.vue'

const nextCard = () => {
  saveWord(english.value)

  page.value++

  english.value = ''
  uzbek.value = ''
  example.value = ''
  opposite.value = ''
}
</script>