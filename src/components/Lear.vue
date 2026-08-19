<!-- <template>
    <div class="max-w-md mx-auto min-h-screen mt-[60px] pb-24">
       
    </div>
    
</template> -->


<template>
    <Navbars   />
  <div class="min-h-screen w-full bg-[#f7f8fc]">
    <!-- PAGE -->
    <main
      class="mx-auto min-h-screen  w-full max-w-[430px] px-4 pb-[100px] pt-[70px]"
    >

      <!-- HEADER -->
      <header class="pt-5">

        <div class="flex items-center justify-between">

          <div>
            <p class="text-[12px] text-gray-500">
              Keep going 👋
            </p>

            <h1 class="mt-1 text-[26px] font-bold text-[#111827]">
              Learn
            </h1>

            <p class="mt-1 text-[12px] text-gray-400">
              Your learning journey
            </p>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
          >
            📚
          </div>

        </div>

      </header>


      <!-- ============================== -->
      <!-- SKILLS -->
      <!-- ============================== -->

      <section class="mt-6">

        <div class="grid grid-cols-2 gap-3">

          <!-- READING -->
          <div
            class="rounded-[22px] bg-white p-4 shadow-sm"
          >

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-lg"
            >
              📖
            </div>

            <p class="mt-3 text-[20px] font-bold text-[#111827]">
              {{ activityCount('Reading') }}
            </p>

            <p class="text-[11px] text-gray-400">
              Reading
            </p>

          </div>


          <!-- LISTENING -->
          <div
            class="rounded-[22px] bg-white p-4 shadow-sm"
          >

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-lg"
            >
              🎧
            </div>

            <p class="mt-3 text-[20px] font-bold text-[#111827]">
              {{ activityCount('Listening') }}
            </p>

            <p class="text-[11px] text-gray-400">
              Listening
            </p>

          </div>


          <!-- SPEAKING -->
          <div
            class="rounded-[22px] bg-white p-4 shadow-sm"
          >

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-lg"
            >
              🎤
            </div>

            <p class="mt-3 text-[20px] font-bold text-[#111827]">
              {{ activityCount('Speaking') }}
            </p>

            <p class="text-[11px] text-gray-400">
              Speaking
            </p>

          </div>


          <!-- VOCABULARY -->
          <div
            class="rounded-[22px] bg-white p-4 shadow-sm"
          >

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-lg"
            >
              📚
            </div>

            <p class="mt-3 text-[20px] font-bold text-[#111827]">
              {{ activityCount('Vocabulary') }}
            </p>

            <p class="text-[11px] text-gray-400">
              Vocabulary
            </p>

          </div>

        </div>

      </section>


      <!-- ============================== -->
      <!-- RECENTLY PRACTICED -->
      <!-- ============================== -->

      <section class="mt-7">

        <div class="flex items-center justify-between">

          <h2 class="text-[18px] font-bold text-[#111827]">
            Recently Practiced
          </h2>

          <span class="text-[10px] text-gray-400">
            {{ learningHistory.length }} activities
          </span>

        </div>


        <!-- HISTORY -->
        <div
          v-if="learningHistory.length > 0"
          class="mt-3 space-y-3"
        >

          <div
            v-for="item in reversedHistory"
            :key="item.id"
            class="rounded-[24px] bg-white p-4 shadow-sm"
          >

            <div class="flex items-center gap-3">

              <!-- ICON -->
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-xl"
              >
                {{ getActivityIcon(item.activity) }}
              </div>


              <!-- INFO -->
              <div class="min-w-0 flex-1">

                <div class="flex items-center justify-between gap-2">

                  <p class="text-[13px] font-bold text-[#111827]">
                    {{ item.activity }}
                  </p>

                  <span
                    class="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-semibold text-green-600"
                  >
                    ✓ Completed
                  </span>

                </div>

                <p class="mt-1 truncate text-[11px] text-gray-500">
                  {{ item.title }}
                </p>

                <p class="mt-1 text-[10px] text-gray-400">
                  {{ item.date }}
                </p>

              </div>

            </div>

          </div>

        </div>


        <!-- EMPTY -->
        <div
          v-else
          class="mt-3 rounded-[24px] bg-white p-6 text-center shadow-sm"
        >

          <div class="text-3xl">
            📚
          </div>

          <h3 class="mt-2 text-[14px] font-bold text-[#111827]">
            Nothing learned yet
          </h3>

          <p class="mt-1 text-[11px] leading-4 text-gray-400">
            Complete your Daily Challenge and your learning
            history will appear here.
          </p>

        </div>

      </section>


      <!-- ============================== -->
      <!-- THIS WEEK -->
      <!-- ============================== -->

      <section class="mt-7">

        <h2 class="text-[18px] font-bold text-[#111827]">
          This Week
        </h2>


        <div
          class="mt-3 rounded-[24px] bg-white p-5 shadow-sm"
        >

          <div
            v-for="day in week"
            :key="day.name"
            class="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
          >

            <!-- LEFT -->
            <div class="flex items-center gap-3">

              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl text-sm"
                :class="
                  day.completed
                    ? 'bg-[#111827] text-white'
                    : 'bg-gray-100 text-gray-400'
                "
              >
                {{ day.completed ? '✓' : day.icon }}
              </div>

              <div>

                <p class="text-[12px] font-semibold text-[#111827]">
                  {{ day.name }}
                </p>

                <p class="text-[10px] text-gray-400">
                  {{ day.activity || 'No practice' }}
                </p>

              </div>

            </div>


            <!-- RIGHT -->
            <span
              v-if="day.completed"
              class="text-[10px] font-semibold text-green-600"
            >
              Done
            </span>

            <span
              v-else
              class="text-[10px] text-gray-300"
            >
              —
            </span>

          </div>

        </div>

      </section>


      <!-- ============================== -->
      <!-- YOUR PLAN -->
      <!-- ============================== -->

      <section class="mt-7">

        <div
          class="rounded-[24px] bg-[#111827] p-5 text-white shadow-lg"
        >

          <div class="flex items-start justify-between">

            <div>

              <p class="text-[10px] font-bold text-gray-400">
                YOUR LEARNING PLAN
              </p>

              <h2 class="mt-2 text-[18px] font-bold">
                Keep your streak alive 🚀
              </h2>

              <p class="mt-1 text-[11px] leading-4 text-gray-300">
                Practice regularly and build your English step by step.
              </p>

            </div>

            <div class="text-2xl">
              🎯
            </div>

          </div>


          <!-- LEVEL -->
          <div class="mt-5 flex items-center gap-2">

            <span
              class="rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-semibold"
            >
              {{ selectedLevel }}
            </span>

            <span
              class="rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-semibold"
            >
              {{ selectedLanguage }}
            </span>

          </div>


          <!-- SELECTED DAYS -->
          <div
            v-if="selectedDays.length > 0"
            class="mt-4 space-y-2"
          >

            <div
              v-for="day in selectedDays"
              :key="day"
              class="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5"
            >

              <span class="text-[10px] font-semibold">
                {{ day }}
              </span>

              <span class="text-[10px] text-gray-300">
                {{ getActivityIcon(dailyActivities[day]) }}
                {{ dailyActivities[day] }}
              </span>

            </div>

          </div>

        </div>

      </section>


      <!-- ============================== -->
      <!-- TOTAL -->
      <!-- ============================== -->

      <section class="mt-7">

        <div
          class="rounded-[24px] border border-gray-200 bg-white p-5"
        >

          <div class="flex items-center justify-between">

            <div>

              <p class="text-[10px] text-gray-400">
                TOTAL PRACTICE
              </p>

              <h2 class="mt-1 text-[25px] font-bold text-[#111827]">
                {{ learningHistory.length }}
              </h2>

              <p class="text-[10px] text-gray-400">
                completed activities
              </p>

            </div>


            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl"
            >
              🏆
            </div>

          </div>

        </div>

      </section>

    </main>

  </div>
  <BottomNav />
</template>


<script setup>

import Navbars from '../components/Navigation.vue'
import BottomNav from '../components/BottomNav.vue'
import { ref, computed, onMounted } from 'vue'


// =====================================
// ACTIVITY ICONS
// =====================================

const practiceActivities = [

  {
    name: 'Reading',
    icon: '📖'
  },

  {
    name: 'Listening',
    icon: '🎧'
  },

  {
    name: 'Speaking',
    icon: '🎤'
  },

  {
    name: 'Vocabulary',
    icon: '📚'
  },

  {
    name: 'Grammar',
    icon: '✍️'
  },

  {
    name: 'Review',
    icon: '🔄'
  }

]


// =====================================
// LEARNING HISTORY
// =====================================

const learningHistory = ref([])


// =====================================
// CHALLENGE DATA
// =====================================

const selectedLevel = ref('B1')

const selectedLanguage = ref('🇬🇧 English')

const selectedDays = ref([])

const selectedTime = ref('30 min')

const dailyActivities = ref({})

const completedPracticeDays = ref([])


// =====================================
// GET ICON
// =====================================

function getActivityIcon(activity) {

  const found = practiceActivities.find(
    item => item.name === activity
  )

  return found
    ? found.icon
    : '📚'

}


// =====================================
// ACTIVITY COUNT
// =====================================

function activityCount(activity) {

  return learningHistory.value.filter(
    item => item.activity === activity
  ).length

}


// =====================================
// REVERSED HISTORY
// =====================================

const reversedHistory = computed(() => {

  return [...learningHistory.value].reverse()

})


// =====================================
// WEEK
// =====================================

const practiceDays = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
]


const dayIcons = {

  Mon: '1️⃣',

  Tue: '2️⃣',

  Wed: '3️⃣',

  Thu: '4️⃣',

  Fri: '5️⃣',

  Sat: '6️⃣',

  Sun: '7️⃣'

}


const week = computed(() => {

  return practiceDays.map(day => {

    const completed =
      completedPracticeDays.value.includes(day)

    const activity =
      dailyActivities.value[day] || ''

    return {

      name: day,

      completed,

      activity,

      icon: getActivityIcon(activity) || dayIcons[day]

    }

  })

})


// =====================================
// LOAD DATA
// =====================================

onMounted(() => {

  // ================================
  // LOAD CHALLENGE
  // ================================

  const savedChallenge =
    localStorage.getItem(
      'dailyChallengeSettings'
    )


  if (savedChallenge) {

    try {

      const data =
        JSON.parse(savedChallenge)


      if (data.level) {

        selectedLevel.value =
          data.level

      }


      if (data.language) {

        selectedLanguage.value =
          data.language

      }


      if (data.days) {

        selectedDays.value =
          data.days

      }


      if (data.time) {

        selectedTime.value =
          data.time

      }


      if (data.activities) {

        dailyActivities.value =
          data.activities

      }

    } catch (error) {

      console.log(
        'Challenge data error:',
        error
      )

    }

  }


  // ================================
  // LOAD COMPLETED DAYS
  // ================================

  const savedCompleted =
    localStorage.getItem(
      'dailyChallengeCompletedDays'
    )


  if (savedCompleted) {

    try {

      completedPracticeDays.value =
        JSON.parse(savedCompleted)

    } catch (error) {

      completedPracticeDays.value = []

    }

  }


  // ================================
  // LOAD LEARNING HISTORY
  // ================================

  const savedHistory =
    localStorage.getItem(
      'learningHistory'
    )


  if (savedHistory) {

    try {

      learningHistory.value =
        JSON.parse(savedHistory)

    } catch (error) {

      learningHistory.value = []

    }

  }

})

</script>