

<template>
  <Navbars   />
  <div class="min-h-screen w-full bg-[#f7f8fc]">

    <!-- MOBILE PAGE -->
    <main
      class="mx-auto w-full max-w-[430px] min-h-screen px-4 mt-[70px] mb-[70px] pb-[90px]"
    >

      <!-- HEADER -->
      <header class="pt-5">

        <div class="flex items-center justify-between">

          <div>
            <p class="text-[12px] text-gray-500">
              Good morning 👋
            </p>

            <h1 class="mt-1 text-[24px] font-bold text-[#111827]">
              Daily Challenge
            </h1>
          </div>

          <button
            @click="showNotification = !showNotification"
            class="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <span class="text-xl">🔔</span>

            <span
              v-if="todayNotification"
              class="absolute right-[9px] top-[8px] h-2 w-2 rounded-full bg-red-500"
            ></span>
          </button>

        </div>

      </header>


      <!-- TODAY NOTIFICATION -->
      <transition name="notification">

        <section
          v-if="showNotification && todayNotification"
          class="mt-4"
        >

          <div
            class="rounded-[22px] border border-gray-200 bg-white p-4 shadow-lg"
          >

            <div class="flex items-start gap-3">

              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#111827] text-xl"
              >
                {{ todayActivityIcon }}
              </div>


              <div class="min-w-0 flex-1">

                <div class="flex items-center justify-between">

                  <p class="text-[10px] font-bold text-gray-400">
                    DAILY CHALLENGE
                  </p>

                  <button
                    @click="showNotification = false"
                    class="text-[14px] text-gray-400"
                  >
                    ✕
                  </button>

                </div>


                <h3 class="mt-1 text-[14px] font-bold text-[#111827]">
                  Today is {{ todayFullName }} 🎯
                </h3>


                <p class="mt-1 text-[11px] leading-4 text-gray-500">
                  Today you need to do your
                  <span class="font-bold text-[#111827]">
                    {{ todayActivity }}
                  </span>
                  practice.
                </p>


                <div class="mt-3 flex items-center justify-between">

                  <span
                    class="rounded-full bg-gray-100 px-3 py-1.5 text-[9px] font-semibold text-gray-600"
                  >
                    {{ selectedTime }}
                  </span>


                  <button
                    @click="startTodayPractice"
                    class="rounded-xl bg-[#111827] px-4 py-2.5 text-[10px] font-bold text-white active:scale-[0.97]"
                  >
                    Start Practice →
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>

      </transition>


      <!-- TODAY CHALLENGE -->
      <section class="mt-6">

        <div
          class="rounded-[26px] bg-[#111827] p-5 text-white shadow-lg"
        >

          <div class="flex items-start justify-between">

            <div class="pr-3">

              <span
                class="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-bold"
              >
                TODAY'S CHALLENGE
              </span>

              <h2 class="mt-4 text-[20px] font-bold leading-tight">
                Keep your English going 🚀
              </h2>

              <p class="mt-2 text-[13px] leading-5 text-gray-300">
                Complete today's challenge and keep your streak alive.
              </p>

            </div>

            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[22px]"
            >
              🎯
            </div>

          </div>


          <button
            @click="startChallenge"
            class="mt-6 h-12 w-full rounded-2xl bg-white text-[14px] font-bold text-[#111827] active:scale-[0.98]"
          >
            Start Challenge →
          </button>

        </div>

      </section>


      <!-- PROGRESS -->
      <section class="mt-7">

        <div class="flex items-center justify-between">

          <h2 class="text-[18px] font-bold text-[#111827]">
            Your progress
          </h2>

          <span class="text-[12px] text-gray-500">
            {{ completedDays }}/{{ selectedDays.length || 7 }} days
          </span>

        </div>


        <div
          class="mt-3 rounded-[26px] bg-white p-5 shadow-sm"
        >

          <div class="flex items-center justify-between">

            <span class="text-[11px] text-gray-400">
              Weekly progress
            </span>

            <span class="text-[11px] font-semibold text-gray-600">
              {{ progress }}%
            </span>

          </div>


          <div
            class="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100"
          >

            <div
              class="h-full rounded-full bg-[#111827] transition-all duration-500"
              :style="{ width: progress + '%' }"
            ></div>

          </div>


          <div class="mt-6 grid grid-cols-7">

            <div
              v-for="day in week"
              :key="day.name"
              class="flex flex-col items-center"
            >

              <div
                class="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold"
                :class="{
                  'bg-[#111827] text-white': day.completed,

                  'border-2 border-[#111827] bg-white text-[#111827]':
                    day.today && !day.completed,

                  'bg-gray-100 text-gray-400':
                    !day.completed && !day.today
                }"
              >

                <span v-if="day.completed">
                  ✓
                </span>

                <span v-else>
                  {{ day.number }}
                </span>

              </div>

              <span
                class="mt-2 text-[10px]"
                :class="
                  day.today
                    ? 'font-bold text-[#111827]'
                    : 'text-gray-400'
                "
              >
                {{ day.name }}
              </span>

            </div>

          </div>

        </div>

      </section>


      <!-- TODAY'S TASK -->
      <section class="mt-7">

        <div class="flex items-center justify-between">

          <h2 class="text-[18px] font-bold text-[#111827]">
            Today's task
          </h2>

          <span
            v-if="todayCompleted"
            class="text-[10px] font-semibold text-green-600"
          >
            Completed ✓
          </span>

        </div>


        <!-- TASK NOT COMPLETED -->
        <div
          v-if="todayActivity && !todayCompleted"
          class="mt-3 rounded-[26px] bg-white p-5 shadow-sm"
        >

          <div class="flex items-center gap-3">

            <div
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-[23px]"
            >
              {{ todayActivityIcon }}
            </div>


            <div class="min-w-0">

              <p class="text-[10px] text-gray-400">
                {{ todayFullName }}
              </p>

              <h3
                class="mt-1 truncate text-[14px] font-bold text-[#111827]"
              >
                {{ todayActivity }} Practice
              </h3>

              <p class="mt-1 text-[11px] text-gray-500">
                {{ selectedTime }}
              </p>

            </div>

          </div>


          <div class="mt-5 flex items-center justify-between">

            <div class="flex items-center gap-2">

              <span
                class="rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-semibold text-gray-600"
              >
                {{ selectedLevel }}
              </span>

              <span class="text-[10px] text-gray-400">
                Today
              </span>

            </div>


            <button
              @click="startTodayPractice"
              class="rounded-xl bg-[#111827] px-4 py-2.5 text-[11px] font-semibold text-white"
            >
              Practice
            </button>

          </div>

        </div>


        <!-- COMPLETED -->
        <div
          v-else-if="todayCompleted"
          class="mt-3 rounded-[26px] bg-white p-5 shadow-sm"
        >

          <div class="flex items-center gap-3">

            <div
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-[23px]"
            >
              ✓
            </div>

            <div>

              <p class="text-[10px] text-green-600">
                WELL DONE 🎉
              </p>

              <h3 class="mt-1 text-[14px] font-bold text-[#111827]">
                Today's challenge completed
              </h3>

              <p class="mt-1 text-[11px] text-gray-500">
                You completed your {{ todayActivity }} practice.
              </p>

            </div>

          </div>

        </div>


        <!-- NO TASK -->
        <div
          v-else
          class="mt-3 rounded-[26px] bg-white p-5 shadow-sm"
        >

          <div class="text-center">

            <div class="text-3xl">
              😴
            </div>

            <h3 class="mt-2 text-[14px] font-bold text-[#111827]">
              No practice today
            </h3>

            <p class="mt-1 text-[11px] text-gray-500">
              Enjoy your day and come back on your next practice day.
            </p>

          </div>

        </div>

      </section>


      <!-- WEEKLY REVIEW -->
      <section class="mt-7">

        <div
          class="rounded-[26px] border border-gray-200 bg-white p-5"
        >

          <div class="flex items-center gap-3">

            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-xl"
            >
              📚
            </div>


            <div class="min-w-0">

              <h3 class="text-[14px] font-bold text-[#111827]">
                Weekly Review
              </h3>

              <p class="mt-1 text-[11px] leading-4 text-gray-500">
                Review everything you practiced this week.
              </p>

            </div>

          </div>


          <button
            @click="weeklyReview"
            class="mt-4 h-11 w-full rounded-2xl bg-gray-100 text-[12px] font-semibold text-gray-700"
          >
            Review this week
          </button>

        </div>

      </section>

    </main>


    


    <!-- CHALLENGE SETUP -->
    <div
      v-if="showChallengeSetup"
      class="fixed inset-0 z-[100] bg-black/50"
    >

      <div
        class="absolute bottom-0 left-0 right-0 mx-auto max-h-[94vh] w-full max-w-[430px] overflow-y-auto rounded-t-[30px] bg-white px-5 pb-7 pt-5"
      >

        <!-- HEADER -->
        <div class="flex items-start justify-between">

          <div class="min-w-0 pr-3">

            <p class="text-[10px] font-bold tracking-wide text-gray-400">
              SET UP YOUR CHALLENGE
            </p>

            <h2
              class="mt-1 text-[21px] font-bold leading-tight text-[#111827]"
            >
              Let's build your plan 🚀
            </h2>

          </div>


          <button
            @click="showChallengeSetup = false"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500"
          >
            ✕
          </button>

        </div>


        <!-- LEVEL -->
        <div class="mt-6">

          <p class="text-[13px] font-bold text-[#111827]">
            What's your English level?
          </p>

          <div class="mt-3 grid grid-cols-4 gap-2">

            <button
              v-for="level in levels"
              :key="level"
              @click="selectedLevel = level"
              class="h-10 rounded-xl text-[11px] font-semibold"
              :class="
                selectedLevel === level
                  ? 'bg-[#111827] text-white'
                  : 'bg-gray-100 text-gray-600'
              "
            >
              {{ level }}
            </button>

          </div>

        </div>


        <!-- LANGUAGE -->
        <div class="mt-5">

          <p class="text-[13px] font-bold text-[#111827]">
            Which language are you learning?
          </p>

          <div class="mt-3 grid grid-cols-2 gap-2">

            <button
              v-for="language in languages"
              :key="language"
              @click="selectedLanguage = language"
              class="h-10 rounded-xl text-[11px] font-semibold"
              :class="
                selectedLanguage === language
                  ? 'bg-[#111827] text-white'
                  : 'bg-gray-100 text-gray-600'
              "
            >
              {{ language }}
            </button>

          </div>

        </div>


        <!-- DAYS -->
        <div class="mt-5">

          <p class="text-[13px] font-bold text-[#111827]">
            Which days do you want to practice?
          </p>

          <p class="mt-1 text-[10px] text-gray-400">
            Select the days you want to study.
          </p>


          <div class="mt-3 grid grid-cols-7 gap-1.5">

            <button
              v-for="day in practiceDays"
              :key="day"
              @click="toggleDay(day)"
              class="flex h-10 items-center justify-center rounded-xl text-[9px] font-semibold"
              :class="
                selectedDays.includes(day)
                  ? 'bg-[#111827] text-white'
                  : 'bg-gray-100 text-gray-500'
              "
            >
              {{ day }}
            </button>

          </div>

        </div>


        <!-- ACTIVITY FOR EACH DAY -->
        <div
          v-if="selectedDays.length > 0"
          class="mt-6"
        >

          <p class="text-[13px] font-bold text-[#111827]">
            Choose an activity for each day
          </p>

          <p class="mt-1 text-[10px] leading-4 text-gray-400">
            Choose what you want to practice on each selected day.
          </p>


          <div class="mt-4 space-y-3">

            <div
              v-for="day in selectedDays"
              :key="day"
              class="rounded-2xl bg-gray-50 p-3"
            >

              <div class="flex items-center justify-between">

                <span class="text-[12px] font-bold text-[#111827]">
                  {{ day }}
                </span>

                <span
                  v-if="dailyActivities[day]"
                  class="text-[10px] font-semibold text-gray-400"
                >
                  {{ dailyActivities[day] }}
                </span>

              </div>


              <div class="mt-3 grid grid-cols-2 gap-2">

                <button
                  v-for="activity in practiceActivities"
                  :key="activity.name"
                  @click="dailyActivities[day] = activity.name"
                  class="flex h-10 items-center gap-2 rounded-xl px-3 text-[10px] font-semibold"
                  :class="
                    dailyActivities[day] === activity.name
                      ? 'bg-[#111827] text-white'
                      : 'bg-white text-gray-600'
                  "
                >

                  <span class="text-[15px]">
                    {{ activity.icon }}
                  </span>

                  <span>
                    {{ activity.name }}
                  </span>

                </button>

              </div>

            </div>

          </div>

        </div>


        <!-- TIME -->
        <div class="mt-6">

          <p class="text-[13px] font-bold text-[#111827]">
            How much time can you practice?
          </p>

          <div class="mt-3 grid grid-cols-3 gap-2">

            <button
              v-for="time in practiceTimes"
              :key="time"
              @click="selectedTime = time"
              class="h-10 rounded-xl text-[10px] font-semibold"
              :class="
                selectedTime === time
                  ? 'bg-[#111827] text-white'
                  : 'bg-gray-100 text-gray-600'
              "
            >
              {{ time }}
            </button>

          </div>

        </div>


        <!-- PLAN PREVIEW -->
        <div
          v-if="selectedDays.length > 0"
          class="mt-5 rounded-2xl bg-gray-50 p-4"
        >

          <p class="text-[10px] font-bold text-gray-400">
            YOUR WEEKLY PLAN
          </p>


          <div class="mt-3 space-y-2">

            <div
              v-for="day in selectedDays"
              :key="day"
              class="flex items-center justify-between"
            >

              <span class="text-[11px] font-semibold text-gray-600">
                {{ day }}
              </span>

              <span
                class="text-[11px] font-bold text-[#111827]"
              >
                {{ getActivityIcon(day) }}
                {{ dailyActivities[day] || 'Not selected' }}
              </span>

            </div>

          </div>

        </div>


        <!-- START -->
        <button
          @click="createChallenge"
          class="mt-5 h-12 w-full rounded-2xl bg-[#111827] text-[13px] font-bold text-white active:scale-[0.98]"
        >
          Start My Challenge 🚀
        </button>

      </div>

    </div>

  </div>
  <BottomNav />
</template>


<script setup>
import Navbars from '../components/Navigation.vue'

import BottomNav from '../components/BottomNav.vue'

import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


// =====================================
// CHALLENGE SETUP
// =====================================

const showChallengeSetup = ref(false)


// =====================================
// NOTIFICATION
// =====================================

const showNotification = ref(false)


// =====================================
// LEVELS
// =====================================

const levels = [
  'A1',
  'A2',
  'B1',
  'B2'
]


// =====================================
// LANGUAGES
// =====================================

const languages = [
  '🇬🇧 English',
  '🇹🇷 Turkish',
  '🇸🇦 Arabic',
  '🇷🇺 Russian'
]


// =====================================
// DAYS
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


// =====================================
// ACTIVITIES
// =====================================

const practiceActivities = [
  {
    name: 'Reading',
    icon: '📖',
    path: '/reading'
  },
  {
    name: 'Listening',
    icon: '🎧',
    path: '/listening'
  },
  {
    name: 'Speaking',
    icon: '🎤',
    path: '/speaking'
  },
  {
    name: 'Vocabulary',
    icon: '📚',
    path: '/vocabulary'
  },
  {
    name: 'Grammar',
    icon: '✍️',
    path: '/grammar'
  },
  {
    name: 'Review',
    icon: '🔄',
    path: '/review'
  }
]


// =====================================
// TIME
// =====================================

const practiceTimes = [
  '15 min',
  '30 min',
  '1 hour'
]


// =====================================
// SELECTED VALUES
// =====================================

const selectedLevel = ref('B1')

const selectedLanguage = ref('🇬🇧 English')

const selectedDays = ref([])

const selectedTime = ref('30 min')

const dailyActivities = ref({})


// =====================================
// COMPLETED DAYS
// =====================================

const completedPracticeDays = ref([])


// =====================================
// OPEN CHALLENGE
// =====================================

function startChallenge() {

  showChallengeSetup.value = true

}


// =====================================
// SELECT / UNSELECT DAY
// =====================================

function toggleDay(day) {

  if (selectedDays.value.includes(day)) {

    selectedDays.value =
      selectedDays.value.filter(
        item => item !== day
      )

    delete dailyActivities.value[day]

  } else {

    selectedDays.value.push(day)

    dailyActivities.value[day] = 'Reading'

  }

}


// =====================================
// ACTIVITY ICON
// =====================================

function getActivityIcon(day) {

  const activity = dailyActivities.value[day]

  const found = practiceActivities.find(
    item => item.name === activity
  )

  return found ? found.icon : ''

}


// =====================================
// TODAY INFO
// =====================================

const todayShortName = computed(() => {

  const dayNames = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ]

  return dayNames[new Date().getDay()]

})


const todayFullName = computed(() => {

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  return dayNames[new Date().getDay()]

})


// =====================================
// TODAY ACTIVITY
// =====================================

const todayActivity = computed(() => {

  const today = todayShortName.value

  return dailyActivities.value[today] || ''

})


// =====================================
// TODAY ACTIVITY ICON
// =====================================

const todayActivityIcon = computed(() => {

  const found = practiceActivities.find(
    item => item.name === todayActivity.value
  )

  return found ? found.icon : '🎯'

})


// =====================================
// TODAY COMPLETED
// =====================================

const todayCompleted = computed(() => {

  return completedPracticeDays.value.includes(
    todayShortName.value
  )

})


// =====================================
// TODAY NOTIFICATION
// =====================================

const todayNotification = computed(() => {

  if (!selectedDays.value.includes(todayShortName.value)) {
    return false
  }

  if (!todayActivity.value) {
    return false
  }

  if (todayCompleted.value) {
    return false
  }

  return true

})


// =====================================
// START TODAY PRACTICE
// =====================================

function startTodayPractice() {

  const today = todayShortName.value

  const activity = dailyActivities.value[today]

  if (!activity) {
    return
  }


  if (!completedPracticeDays.value.includes(today)) {

    completedPracticeDays.value.push(today)

  }


  saveCompletedDays()


  showNotification.value = false


  const selectedActivity =
    practiceActivities.find(
      item => item.name === activity
    )


  if (selectedActivity?.path) {

    router.push(selectedActivity.path)

  }

}


// =====================================
// SAVE COMPLETED DAYS
// =====================================

function saveCompletedDays() {

  localStorage.setItem(
    'dailyChallengeCompletedDays',
    JSON.stringify(
      completedPracticeDays.value
    )
  )

}


// =====================================
// CREATE CHALLENGE
// =====================================

function createChallenge() {

  if (selectedDays.value.length === 0) {

    alert(
      'Please select at least one practice day.'
    )

    return

  }


  const missingActivity =
    selectedDays.value.find(
      day => !dailyActivities.value[day]
    )


  if (missingActivity) {

    alert(
      `Please choose an activity for ${missingActivity}.`
    )

    return

  }


  const challengeSettings = {

    level: selectedLevel.value,

    language: selectedLanguage.value,

    days: selectedDays.value,

    time: selectedTime.value,

    activities: dailyActivities.value,

    started: true

  }


  localStorage.setItem(
    'dailyChallengeSettings',
    JSON.stringify(
      challengeSettings
    )
  )


  completedPracticeDays.value = []

  localStorage.setItem(
    'dailyChallengeCompletedDays',
    JSON.stringify([])
  )


  showChallengeSetup.value = false


  if (
    selectedDays.value.includes(
      todayShortName.value
    )
  ) {

    setTimeout(() => {

      showNotification.value = true

    }, 300)

  }

}


// =====================================
// LOAD SAVED CHALLENGE
// =====================================

onMounted(() => {

  const saved =
    localStorage.getItem(
      'dailyChallengeSettings'
    )


  if (saved) {

    try {

      const data =
        JSON.parse(saved)


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
        'Challenge settings error:',
        error
      )

    }

  }


  const completed =
    localStorage.getItem(
      'dailyChallengeCompletedDays'
    )


  if (completed) {

    try {

      completedPracticeDays.value =
        JSON.parse(completed)

    } catch (error) {

      completedPracticeDays.value = []

    }

  }


  setTimeout(() => {

    if (todayNotification.value) {

      showNotification.value = true

    }

  }, 500)

})


// =====================================
// WEEKLY PROGRESS
// =====================================

const week = computed(() => {

  const dayNumbers = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7
  }


  return practiceDays.map(day => {

    return {

      name: day,

      number: dayNumbers[day],

      completed:
        completedPracticeDays.value.includes(day),

      today:
        day === todayShortName.value

    }

  })

})


// =====================================
// COMPLETED DAYS COUNT
// =====================================

const completedDays = computed(() => {

  return completedPracticeDays.value.filter(
    day => selectedDays.value.includes(day)
  ).length

})


// =====================================
// PROGRESS
// =====================================

const progress = computed(() => {

  if (selectedDays.value.length === 0) {
    return 0
  }


  return Math.min(
    100,
    Math.round(
      (
        completedDays.value /
        selectedDays.value.length
      ) * 100
    )
  )

})


// =====================================
// BOTTOM NAVIGATION
// =====================================

const navigation = ref([

  {
    name: 'Home',
    icon: '⌂',
    path: '/',
    active: false
  },

  {
    name: 'Daily',
    icon: '🎯',
    path: '/Chelange',
    active: true
  },

  {
    name: 'Practice',
    icon: '🎤',
    path: '/speaking',
    active: false
  },

  {
    name: 'Progress',
    icon: '📊',
    path: '/progress',
    active: false
  }

])


// =====================================
// WEEKLY REVIEW
// =====================================

function weeklyReview() {

  alert(
    'Weekly Review'
  )

}


// =====================================
// NAVIGATION
// =====================================

function goTo(path) {

  router.push(path)

}

</script>


<style scoped>

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

</style>