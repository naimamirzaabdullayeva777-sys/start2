<template>
  <div class="min-h-screen bg-[#f7f8fc] px-4 py-6">
    <div class="mx-auto w-full mt-[60px] mb-[60px] max-w-[430px]">

      <!-- HEADER -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] font-bold tracking-wider text-gray-400">BUBBLE POP</p>
          <h1 class="mt-1 text-[24px] font-black text-[#111827]">Word Rush 🎈</h1>
        </div>

        <div class="rounded-2xl bg-white px-4 py-2 shadow-sm">
          <p class="text-[9px] font-semibold text-gray-400">TIME</p>
          <p class="text-lg font-black" :class="time <= 10 ? 'text-red-500' : 'text-[#111827]'">
            {{ time }}s
          </p>
        </div>
      </div>

      <!-- SCORE -->
      <div class="mt-5 flex items-center justify-between">
        <span class="text-[11px] font-semibold text-gray-400">
          WORD {{ completedWords }}/{{ words.length }}
        </span>

        <span class="text-[11px] font-bold text-[#111827]">
          Score: {{ score }}
        </span>
      </div>

      <!-- WORDS -->
      <div class="mt-3 rounded-2xl bg-white p-4 shadow-sm">
        <p class="text-[9px] font-bold text-gray-400">FIND THESE WORDS</p>

        <div class="mt-3 flex flex-wrap gap-2">
          <div
            v-for="word in words"
            :key="word"
            class="rounded-full px-3 py-1.5 text-[10px] font-bold"
            :class="foundWords.includes(word)
              ? 'bg-[#111827] text-white'
              : 'bg-gray-100 text-gray-500'"
          >
            <span v-if="foundWords.includes(word)">✓</span>
            {{ word }}
          </div>
        </div>
      </div>

      <!-- GAME -->
      <div class="mt-1 rounded-[24px] w-[400px] bg-[#111827] ml-[20px] p-4 shadow-xl">

  <div class="text-center">
    <p class="text-[8px] font-semibold text-gray-400">
      TAP THE LETTERS IN ORDER
    </p>
    <p class="mt-1 text-[10px] text-gray-500">
      Find all {{ words.length }} words
    </p>
  </div>

  <!-- SELECTED -->
  <div class="mt-4 flex min-h-[48px] items-center justify-center gap-1.5 rounded-2xl bg-white/10 px-2">

    <template v-if="currentAnswer.length">
      <span
        v-for="bubble in currentAnswer"
        :key="bubble.id"
        class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-xs font-black text-white"
      >
        {{ bubble.letter }}
      </span>
    </template>

    <span v-else class="text-[10px] text-gray-500">
      Choose letters...
    </span>

  </div>

  <!-- BUBBLES -->
  <div class="mt-5 flex min-h-[220px] flex-wrap items-center justify-center gap-2">

    <button
      v-for="bubble in bubbles"
      :key="bubble.id"
      @click="selectBubble(bubble)"
      class="flex h-11 w-11 items-center justify-center rounded-full text-[18px] font-black shadow-md transition-all duration-200"
      :class="bubble.used
        ? 'bg-blue-500 text-white scale-105'
        : 'bg-white text-[#111827]'"
    >
      {{ bubble.letter }}
    </button>

  </div>

  <button
    @click="clearCurrentWord"
    class="mt-4 w-full rounded-xl bg-white/10 py-2.5 text-[10px] font-bold text-gray-300"
  >
    Clear current word
  </button>

</div>

      <!-- MESSAGE -->
      <transition name="fade">
        <div v-if="message" class="mt-4 rounded-2xl bg-white p-4 text-center shadow-sm">
          <p class="text-sm font-bold text-[#111827]">{{ message }}</p>
        </div>
      </transition>

      <!-- FINISH -->
      <div
        v-if="gameFinished"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
      >
        <div class="w-full max-w-[400px] rounded-[30px] bg-white p-7 text-center">
          <div class="text-5xl">🎉</div>

          <h2 class="mt-3 text-2xl font-black text-[#111827]">Amazing!</h2>

          <p class="mt-2 text-sm text-gray-500">
            You found all the words
          </p>

          <div class="mt-4 text-4xl font-black text-[#111827]">
            {{ score }}/{{ words.length }}
          </div>

          <button
            @click="restartGame"
            class="mt-6 h-12 w-full rounded-2xl bg-[#111827] text-sm font-bold text-white"
          >
            Play Again 🎈
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const allWords = [
  'BOOK', 'HOUSE', 'APPLE', 'WATER', 'HAPPY',
  'LIGHT', 'MUSIC', 'TABLE', 'CHAIR', 'PHONE',
  'WORLD', 'SMILE', 'GREEN', 'BLACK', 'WHITE',
  'SCHOOL', 'FRIEND', 'FAMILY', 'MOTHER', 'FATHER',
  'SISTER', 'BROTHER', 'SUMMER', 'WINTER', 'SPRING',
  'AUTUMN', 'RIVER', 'OCEAN', 'MOUNTAIN', 'FOREST',
  'FLOWER', 'GARDEN', 'ANIMAL', 'TIGER', 'HORSE',
  'BIRD', 'FISH', 'CLOUD', 'RAIN', 'SUNNY',
  'HAPPY', 'STRONG', 'SMALL', 'LARGE', 'QUICK',
  'QUIET', 'BRIGHT', 'DARK', 'COLD', 'HOT',
  'BREAD', 'MILK', 'WATER', 'JUICE', 'FRUIT',
  'PIZZA', 'CAKE', 'SUGAR', 'SCHOOL', 'CLASS',
  'TEACHER', 'STUDENT', 'PENCIL', 'PAPER', 'BOOK',
  'MONEY', 'HOUSE', 'ROOM', 'DOOR', 'WINDOW',
  'TRAIN', 'PLANE', 'CAR', 'BIKE', 'BUS',
  'ROAD', 'CITY', 'COUNTRY', 'WORLD', 'PLACE',
  'HAPPY', 'SAD', 'LOVE', 'HOPE', 'DREAM',
  'NIGHT', 'MORNING', 'EVENING', 'TODAY', 'TOMORROW',
  'YESTERDAY', 'TIME', 'YEAR', 'MONTH', 'WEEK',
  'DAY', 'WORK', 'PLAY', 'GAME', 'SPORT'
]

// Bir o'yinda chiqadigan so'zlar
const WORDS_PER_GAME = 6

// Hozirgi o'yindagi so'zlar
const words = ref([])

// Hali ishlatilmagan so'zlar
const unusedWords = ref([])

const bubbles = ref([])
const currentAnswer = ref([])
const foundWords = ref([])
const score = ref(0)
const time = ref(60)
const message = ref('')
const gameFinished = ref(false)

let timer = null

const completedWords = computed(() => foundWords.value.length)

function shuffle(arr) {
  const a = [...arr]

  for (let i = a.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[r]] = [a[r], a[i]]
  }

  return a
}


// Yangi 6 ta so'z olish
function getNewWords() {

  // Agar so'zlar tugagan bo'lsa,
  // 100 ta so'zni yana boshidan boshlaymiz
  if (unusedWords.value.length < WORDS_PER_GAME) {

    unusedWords.value = shuffle(allWords)

  }

  words.value = unusedWords.value.splice(0, WORDS_PER_GAME)
}


// Harflarni yaratish
function createBubbles() {

  const letters = words.value.join('').split('')

  bubbles.value = shuffle(letters).map((l, i) => ({
    id: Date.now() + i + Math.random(),
    letter: l,
    used: false
  }))
}


// Harfni tanlash
function selectBubble(bubble) {

  if (bubble.used || gameFinished.value) return

  bubble.used = true

  currentAnswer.value.push(bubble)

  checkWord()
}


// So'zni tekshirish
function checkWord() {

  const answer = currentAnswer.value
    .map(b => b.letter)
    .join('')

  const matched = words.value.find(
    w =>
      w === answer &&
      !foundWords.value.includes(w)
  )

  if (matched) {

    foundWords.value.push(matched)

    score.value++

    message.value = `Correct! 🎉`

    // Harflar yo'qolmaydi
// Faqat tanlangan holatini olib tashlaymiz
currentAnswer.value.forEach(b => {
  b.used = false
})

currentAnswer.value = []

    // Hamma 6 ta so'z topilsa
    if (foundWords.value.length === words.value.length) {

      clearInterval(timer)

      setTimeout(() => {
        gameFinished.value = true
      }, 700)

      return
    }

    setTimeout(() => {
      message.value = ''
    }, 600)

    return
  }


  const hasPrefix = words.value.some(
    w =>
      !foundWords.value.includes(w) &&
      w.startsWith(answer)
  )


  if (!hasPrefix) {

    message.value = 'Wrong 😅'

    setTimeout(() => {

      currentAnswer.value.forEach(
        b => b.used = false
      )

      currentAnswer.value = []

      message.value = ''

    }, 500)
  }
}


// Tanlangan harflarni tozalash
function clearCurrentWord() {

  currentAnswer.value.forEach(
    b => b.used = false
  )

  currentAnswer.value = []

  message.value = ''
}


// Timer
function startTimer() {

  clearInterval(timer)

  timer = setInterval(() => {

    if (time.value > 0) {

      time.value--

    } else {

      clearInterval(timer)

      message.value = 'Time is up! ⏰'
    }

  }, 1000)
}


// O'yinni boshlash / Play Again
function restartGame() {

  currentAnswer.value = []

  foundWords.value = []

  score.value = 0

  time.value = 60

  message.value = ''

  gameFinished.value = false

  // MUHIM:
  // Har safar yangi 6 ta so'z olinadi
  getNewWords()

  createBubbles()

  startTimer()
}


onMounted(() => {

  // Birinchi o'yin
  getNewWords()

  createBubbles()

  startTimer()
})


onUnmounted(() => {

  clearInterval(timer)

})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active{
  transition:opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to{
  opacity:0;
}
</style>