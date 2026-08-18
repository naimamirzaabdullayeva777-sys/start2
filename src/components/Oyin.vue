<template>
  <div class="min-h-screen bg-[#f7f8fc] mt-[80px] px-4 py-4">

    <div class="mx-auto w-full max-w-[400px] pb-6">

      <!-- HEADER -->
      <div class="flex items-center justify-between">

        <div>
          <p class="text-[7px] font-bold tracking-[2px] text-gray-400">
            LANGUAGE GAME
          </p>

          <h1 class="mt-0.5 text-[20px] font-black text-[#111827]">
            Sentence Match 🧩
          </h1>
        </div>

        <!-- TIMER -->
        <div class="rounded-xl bg-white px-3 py-1.5 text-center shadow-sm">

          <p class="text-[7px] font-bold text-gray-400">
            TIME
          </p>

          <p
            class="text-sm font-black"
            :class="time <= 10 ? 'text-red-500' : 'text-[#111827]'"
          >
            {{ time }}s
          </p>

        </div>

      </div>


      <!-- PROGRESS -->
      <div class="mt-3">

        <div class="flex items-center justify-between">

          <span class="text-[8px] font-bold text-gray-400">
            QUESTION
          </span>

          <span class="text-[8px] font-black text-[#111827]">
            {{ currentIndex + 1 }}/{{ questions.length }}
          </span>

        </div>

        <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200">

          <div
            class="h-full rounded-full bg-[#111827] transition-all duration-300"
            :style="{
              width: `${((currentIndex + 1) / questions.length) * 100}%`
            }"
          ></div>

        </div>

      </div>


      <!-- GAME -->
      <div class="mt-3 rounded-[24px] bg-[#111827] p-3 shadow-xl">

        <!-- ICON -->
        <div class="text-center">

          <div
            class="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg"
          >
            🧩
          </div>

          <p class="mt-1.5 text-[7px] font-bold tracking-[2px] text-gray-400">
            FIND THE TRANSLATION
          </p>

        </div>


        <!-- ENGLISH -->
        <div
          class="mt-3 rounded-[18px] bg-white p-3.5"
        >

          <div class="flex items-center gap-1.5">

            <span
              class="flex h-6 w-6 items-center justify-center rounded-md bg-[#111827] text-[7px] font-black text-white"
            >
              EN
            </span>

            <span class="text-[7px] font-bold text-gray-400">
              ENGLISH
            </span>

          </div>

          <p
            class="mt-2.5 text-[14px] font-black leading-5 text-[#111827]"
          >
            {{ currentQuestion.en }}
          </p>

        </div>


        <!-- ANSWERS -->
        <div class="mt-3">

          <p class="mb-1.5 text-[7px] font-bold text-gray-500">
            CHOOSE TRANSLATION
          </p>


          <button
            v-for="answer in currentAnswers"
            :key="answer.id"
            @click="selectAnswer(answer)"
            :disabled="answerLocked"
            class="mb-1.5 flex min-h-[48px] w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-all duration-200"
            :class="getAnswerClass(answer)"
          >

            <span
              class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[8px] font-black"
            >
              {{ answer.letter }}
            </span>

            <span class="text-[10px] font-bold leading-4">
              {{ answer.uz }}
            </span>

          </button>

        </div>


        <!-- MESSAGE -->
        <transition name="fade">

          <div
            v-if="message"
            class="mt-2 rounded-xl bg-white/10 px-3 py-2 text-center"
          >

            <p
              class="text-[9px] font-bold"
              :class="
                messageType === 'correct'
                  ? 'text-green-300'
                  : 'text-red-300'
              "
            >
              {{ message }}
            </p>

          </div>

        </transition>


        <!-- SCORE -->
        <div class="mt-2 flex items-center justify-between">

          <span class="text-[7px] font-bold text-gray-500">
            SCORE
          </span>

          <span class="text-sm font-black text-white">
            {{ score }}
          </span>

        </div>

      </div>


      <!-- FINISH -->
      <div
        v-if="gameFinished"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      >

        <div
          class="w-full max-w-[350px] rounded-[26px] bg-white p-6 text-center shadow-2xl"
        >

          <div class="text-4xl">
            🎉
          </div>

          <h2 class="mt-2 text-xl font-black text-[#111827]">
            Great Job!
          </h2>

          <p class="mt-1 text-xs text-gray-500">
            You finished all 6 questions.
          </p>

          <div class="mt-4 text-3xl font-black text-[#111827]">
            {{ score }}/{{ questions.length }}
          </div>

          <p class="mt-1 text-[9px] text-gray-400">
            Correct answers
          </p>

          <button
            @click="restartGame"
            class="mt-5 h-10 w-full rounded-xl bg-[#111827] text-[10px] font-bold text-white"
          >
            Play Again 🧩
          </button>

        </div>

      </div>

    </div>

  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'


/* =========================
   SENTENCES
========================= */

const allQuestions = [
  {
    id: 1,
    en: 'I forgot to bring my book today.',
    uz: 'Bugun kitobimni olib kelishni unutdim.'
  },
  {
    id: 2,
    en: 'She is waiting for her friend outside.',
    uz: 'U dugonasini tashqarida kutyapti.'
  },
  {
    id: 3,
    en: 'We usually have dinner together.',
    uz: 'Biz odatda kechki ovqatni birga yeymiz.'
  },
  {
    id: 4,
    en: 'I need to finish this work before Friday.',
    uz: 'Men bu ishni jumagacha tugatishim kerak.'
  },
  {
    id: 5,
    en: 'He did not understand the question.',
    uz: 'U savolni tushunmadi.'
  },
  {
    id: 6,
    en: 'They went to the park after school.',
    uz: 'Ular maktabdan keyin bog‘ga borishdi.'
  },
  {
    id: 7,
    en: 'My brother is learning how to drive.',
    uz: 'Akam mashina haydashni o‘rganmoqda.'
  },
  {
    id: 8,
    en: 'I have never been to London.',
    uz: 'Men hech qachon Londonda bo‘lmaganman.'
  },
  {
    id: 9,
    en: 'She called me when she arrived home.',
    uz: 'U uyga yetib kelganida menga qo‘ng‘iroq qildi.'
  },
  {
    id: 10,
    en: 'We are going to watch a movie tonight.',
    uz: 'Bugun kechqurun kino ko‘rmoqchimiz.'
  },
  {
    id: 11,
    en: 'I usually wake up early in the morning.',
    uz: 'Men odatda ertalab erta uyg‘onaman.'
  },
  {
    id: 12,
    en: 'He is looking for his phone.',
    uz: 'U telefonini qidiryapti.'
  },
    {
    id: 13,
    en: 'I left my keys on the table.',
    uz: 'Men kalitlarimni stol ustida qoldirdim.'
  },
  {
    id: 14,
    en: 'She wants to learn English faster.',
    uz: 'U ingliz tilini tezroq o‘rganishni xohlaydi.'
  },
  {
    id: 15,
    en: 'We are waiting for the bus.',
    uz: 'Biz avtobusni kutyapmiz.'
  },
  {
    id: 16,
    en: 'He usually walks to school.',
    uz: 'U odatda maktabga piyoda boradi.'
  },
  {
    id: 17,
    en: 'I bought a new shirt yesterday.',
    uz: 'Men kecha yangi ko‘ylak sotib oldim.'
  },
  {
    id: 18,
    en: 'They are having lunch in the kitchen.',
    uz: 'Ular oshxonada tushlik qilishyapti.'
  },
  {
    id: 19,
    en: 'My sister is watching TV in her room.',
    uz: 'Singlim xonasida televizor ko‘ryapti.'
  },
  {
    id: 20,
    en: 'I need some time to think about it.',
    uz: 'Bu haqda o‘ylash uchun menga biroz vaqt kerak.'
  },
  {
    id: 21,
    en: 'She forgot to call her mother.',
    uz: 'U onasiga qo‘ng‘iroq qilishni unutdi.'
  },
  {
    id: 22,
    en: 'We went shopping after work.',
    uz: 'Biz ishdan keyin xarid qilishga bordik.'
  },
  {
    id: 23,
    en: 'He is talking to his teacher.',
    uz: 'U o‘qituvchisi bilan gaplashyapti.'
  },
  {
    id: 24,
    en: 'I cannot find my glasses.',
    uz: 'Men ko‘zoynagimni topa olmayapman.'
  },
  {
    id: 25,
    en: 'She usually drinks tea in the evening.',
    uz: 'U odatda kechqurun choy ichadi.'
  },
  {
    id: 26,
    en: 'They moved to a new house last year.',
    uz: 'Ular o‘tgan yili yangi uyga ko‘chib o‘tishdi.'
  },
  {
    id: 27,
    en: 'I am trying to improve my English.',
    uz: 'Men ingliz tilimni yaxshilashga harakat qilyapman.'
  },
  {
    id: 28,
    en: 'He left home without saying goodbye.',
    uz: 'U xayrlashmasdan uydan chiqib ketdi.'
  },
  {
    id: 29,
    en: 'We have to clean the room today.',
    uz: 'Bugun xonani tozalashimiz kerak.'
  },
  {
    id: 30,
    en: 'She is cooking dinner for her family.',
    uz: 'U oilasi uchun kechki ovqat tayyorlayapti.'
  },
  {
    id: 31,
    en: 'I saw an interesting movie last night.',
    uz: 'Men kecha kechqurun qiziqarli film ko‘rdim.'
  },
  {
    id: 32,
    en: 'He does not like waking up early.',
    uz: 'U erta uyg‘onishni yoqtirmaydi.'
  },
  {
    id: 33,
    en: 'We are planning a trip for next month.',
    uz: 'Biz keyingi oy uchun sayohat rejalashtiryapmiz.'
  },
  {
    id: 34,
    en: 'She sent me a message this morning.',
    uz: 'U bugun ertalab menga xabar yubordi.'
  },
  {
    id: 35,
    en: 'I have already finished my homework.',
    uz: 'Men uy vazifamni allaqachon tugatdim.'
  },
  {
    id: 36,
    en: 'They are looking for a place to stay.',
    uz: 'Ular qolish uchun joy qidirishyapti.'
  },
  {
    id: 37,
    en: 'My father works in a small office.',
    uz: 'Mening otam kichik ofisda ishlaydi.'
  },
  {
    id: 38,
    en: 'I forgot where I put my phone.',
    uz: 'Telefonimni qayerga qo‘yganimni unutdim.'
  },
  {
    id: 39,
    en: 'She was tired after a long day.',
    uz: 'U uzoq kundan keyin charchagan edi.'
  },
  {
    id: 40,
    en: 'We usually meet at the weekend.',
    uz: 'Biz odatda dam olish kunlari uchrashamiz.'
  },
  {
    id: 41,
    en: 'He wants to buy a new computer.',
    uz: 'U yangi kompyuter sotib olmoqchi.'
  },
  {
    id: 42,
    en: 'I am not feeling well today.',
    uz: 'Bugun o‘zimni yaxshi his qilmayapman.'
  },
  {
    id: 43,
    en: 'She opened the window because it was hot.',
    uz: 'U issiq bo‘lgani uchun derazani ochdi.'
  },
  {
    id: 44,
    en: 'They arrived at the station late.',
    uz: 'Ular vokzalga kech yetib kelishdi.'
  },
  {
    id: 45,
    en: 'I need to buy some food before we go home.',
    uz: 'Uyga ketishimizdan oldin oziq-ovqat sotib olishim kerak.'
  },
  {
    id: 46,
    en: 'He is learning to cook by himself.',
    uz: 'U o‘zi mustaqil ovqat pishirishni o‘rganmoqda.'
  },
  {
    id: 47,
    en: 'She asked me to help her with the homework.',
    uz: 'U mendan uy vazifasiga yordam berishimni so‘radi.'
  },
  {
    id: 48,
    en: 'We stayed at home because it was raining.',
    uz: 'Yomg‘ir yog‘ayotgani uchun uyda qoldik.'
  },
  {
    id: 49,
    en: 'I will call you when I get home.',
    uz: 'Uyga yetib borganimda senga qo‘ng‘iroq qilaman.'
  },
  {
    id: 50,
    en: 'She has been waiting for you for an hour.',
    uz: 'U seni bir soatdan beri kutyapti.'
  },
  {
    id: 51,
    en: 'I usually listen to music while I study.',
    uz: 'Men odatda o‘qiyotganimda musiqa tinglayman.'
  },
  {
    id: 52,
    en: 'He forgot his password again.',
    uz: 'U yana parolini unutdi.'
  },
  {
    id: 53,
    en: 'They decided to stay at home tonight.',
    uz: 'Ular bugun kechqurun uyda qolishga qaror qilishdi.'
  },
  {
    id: 54,
    en: 'I have never tried this kind of food.',
    uz: 'Men hech qachon bunday ovqatni tatib ko‘rmaganman.'
  },
  {
    id: 55,
    en: 'She is getting ready for school.',
    uz: 'U maktabga tayyorlanyapti.'
  },
  {
    id: 56,
    en: 'We need to leave before it gets dark.',
    uz: 'Qorong‘i tushishidan oldin ketishimiz kerak.'
  },
  {
    id: 57,
    en: 'He told me about his new job.',
    uz: 'U menga yangi ishi haqida gapirib berdi.'
  },
  {
    id: 58,
    en: 'I could not sleep because of the noise.',
    uz: 'Shovqin tufayli uxlay olmadim.'
  },
  {
    id: 59,
    en: 'She bought some flowers for her mother.',
    uz: 'U onasi uchun gullar sotib oldi.'
  },
  {
    id: 60,
    en: 'We are going to visit our grandparents tomorrow.',
    uz: 'Biz ertaga buvi va bobomizni ko‘rgani boramiz.'
  }
  
]



/* =========================
   SETTINGS
========================= */

const QUESTIONS_PER_GAME = 6


/* =========================
   STATE
========================= */

const questions = ref([])

const currentIndex = ref(0)

const currentAnswers = ref([])

const selectedAnswer = ref(null)

const answerLocked = ref(false)

const score = ref(0)

const time = ref(60)

const message = ref('')

const messageType = ref('')

const gameFinished = ref(false)

let timer = null


/* =========================
   CURRENT QUESTION
========================= */

const currentQuestion = computed(() => {

  return questions.value[currentIndex.value] || {
    en: '',
    uz: ''
  }

})


/* =========================
   SHUFFLE
========================= */

function shuffle(array) {

  const arr = [...array]

  for (let i = arr.length - 1; i > 0; i--) {

    const random = Math.floor(
      Math.random() * (i + 1)
    )

    ;[arr[i], arr[random]] =
      [arr[random], arr[i]]
  }

  return arr
}


/* =========================
   CREATE ANSWERS
========================= */

function createAnswers() {

  const correct = currentQuestion.value

  const wrongAnswers = shuffle(
    allQuestions.filter(
      question => question.id !== correct.id
    )
  ).slice(0, 2)


  currentAnswers.value = shuffle([
    correct,
    ...wrongAnswers
  ]).map((answer, index) => ({
    ...answer,
    letter: ['A', 'B', 'C'][index]
  }))

}


/* =========================
   START GAME
========================= */

function createGame() {

  questions.value = shuffle(allQuestions)
    .slice(0, QUESTIONS_PER_GAME)

  currentIndex.value = 0

  selectedAnswer.value = null

  answerLocked.value = false

  score.value = 0

  time.value = 60

  message.value = ''

  messageType.value = ''

  gameFinished.value = false

  createAnswers()

  startTimer()

}


/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(answer) {

  if (answerLocked.value) return

  selectedAnswer.value = answer

  answerLocked.value = true


  if (answer.id === currentQuestion.value.id) {

    score.value++

    message.value = 'Correct! 🎉'

    messageType.value = 'correct'

  } else {

    message.value = 'Not quite 😅'

    messageType.value = 'wrong'

  }


  /*
    NEXT avtomatik o'tadi.
    User hech qanday Next tugmasini bosmaydi.
  */

  setTimeout(() => {

    nextQuestion()

  }, 900)

}


/* =========================
   ANSWER DESIGN
========================= */

function getAnswerClass(answer) {

  if (!answerLocked.value) {

    return 'bg-white/10 text-gray-300 hover:bg-white/15'
  }


  if (answer.id === currentQuestion.value.id) {

    return 'bg-green-500 text-white'
  }


  if (selectedAnswer.value?.id === answer.id) {

    return 'bg-red-500 text-white'
  }


  return 'bg-white/5 text-gray-500'
}


/* =========================
   NEXT
========================= */

function nextQuestion() {

  if (
    currentIndex.value ===
    questions.value.length - 1
  ) {

    clearInterval(timer)

    gameFinished.value = true

    return

  }


  currentIndex.value++

  selectedAnswer.value = null

  answerLocked.value = false

  message.value = ''

  messageType.value = ''

  createAnswers()

}


/* =========================
   TIMER
========================= */

function startTimer() {

  clearInterval(timer)

  timer = setInterval(() => {

    if (time.value > 0) {

      time.value--

    } else {

      clearInterval(timer)

      message.value = 'Time is up! ⏰'

      messageType.value = 'wrong'

      answerLocked.value = true

    }

  }, 1000)

}


/* =========================
   PLAY AGAIN
========================= */

function restartGame() {

  createGame()

}


/* =========================
   MOUNT
========================= */

onMounted(() => {

  createGame()

})


/* =========================
   UNMOUNT
========================= */

onUnmounted(() => {

  clearInterval(timer)

})
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>