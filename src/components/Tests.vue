<template>
<div class="min-h-screen bg-slate-100 mt-[60px]">
  <div class="max-w-sm mx-auto bg-white min-h-screen">

    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600
                rounded-b-[30px] p-5 text-white">

      <div class="flex justify-between items-center">
        <div>
          <p class="text-xs opacity-80">English Test</p>
          <h1 class="text-2xl font-bold">B1 Grammar</h1>
        </div>

        <div class="bg-white/20 px-3 py-1 rounded-full text-sm">
          {{ current + 1 }}/{{ questions.length }}
        </div>
      </div>

      <div class="w-full h-2 bg-white/20 rounded-full mt-4">
        <div
          class="h-2 bg-white rounded-full duration-300"
          :style="{ width: progress + '%' }"
        />
      </div>
    </div>

    <!-- Question -->
    <div v-if="!finish" class="p-4">
      <div class="bg-white rounded-3xl shadow p-5">

        <p class="text-gray-400 text-sm mb-2">
          Question {{ current + 1 }}
        </p>

        <h2 class="text-xl font-bold leading-8 mb-5">
          {{ question.q }}
        </h2>

        <button
          v-for="(item,i) in question.options"
          :key="i"
          @click="select=i"
          class="w-full border-2 rounded-2xl p-4 mb-3 text-left duration-200"
          :class="select===i
          ?'border-blue-600 bg-blue-50'
          :'border-gray-200'"
        >
          {{ item }}
        </button>

        <button
          @click="next"
          :disabled="select===null"
          class="w-full bg-blue-600 disabled:bg-gray-300
                 text-white py-4 rounded-2xl font-bold mt-2">
          {{ current==questions.length-1 ? 'Finish' : 'Next' }}
        </button>

      </div>
    </div>

    <!-- Result -->
    <div v-else class="p-5">
      <div class="bg-white rounded-3xl shadow p-6 text-center">
        <div class="w-24 h-24 bg-green-100 rounded-full
                    flex items-center justify-center mx-auto text-5xl">
          🏆
        </div>

        <h2 class="text-2xl font-bold mt-4">Completed</h2>

        <h1 class="text-5xl font-bold text-blue-600 my-4">
          {{ score }}/{{ questions.length }}
        </h1>

        <button
          @click="restart"
          class="w-full bg-purple-600 text-white
                 py-4 rounded-2xl font-bold">
          Try Again
        </button>

      </div>
    </div>

  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const current = ref(0)
const select = ref(null)
const score = ref(0)
const finish = ref(false)

const questions = ref([
  {
    q:'She ___ to school every day.',
    options:['go','goes','going'],
    answer:1
  },
  {
    q:'I have lived here ___ 2022.',
    options:['for','since','at'],
    answer:1
  },
  {
    q:'They ___ dinner now.',
    options:['are eating','eat','eats'],
    answer:0
  }
])

const question = computed(() => questions.value[current.value])

const progress = computed(() =>
 ((current.value+1)/questions.value.length)*100
)

const next = () => {
  if(select.value===null) return

  if(select.value===question.value.answer)
    score.value++

  if(current.value===questions.value.length-1){
    finish.value=true
  }else{
    current.value++
    select.value=null
  }
}

const restart=()=>{
  current.value=0
  score.value=0
  select.value=null
  finish.value=false
}
</script>