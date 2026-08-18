<template>
  <Navbars />
  <div class="min-h-screen bg-[#f7f8fc] px-4 pt-6 pb-32 mt-[60px]">
    <div class="mx-auto w-full max-w-md">

      <!-- HEADER -->
      <div class="mb-6 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-400">English Games</p>
          <h1 class="text-2xl font-black text-gray-900">
            O‘yinlar 🎮
          </h1>
        </div>

        <div
          class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          🎯
        </div>
      </div>

      <!-- GAMES -->
      <div class="space-y-5">

        <!-- ================= BUBBLE POP ================= -->
        <button
          @click="openGame('bubble')"
          class="game-card relative w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-5 text-left shadow-lg transition active:scale-[0.98]"
        >

          <!-- TITLE -->
          <div class="relative z-20">
            <div
              class="mb-1 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur"
            >
              WORD GAME
            </div>

            <h2 class="text-2xl font-black text-white">
              BubblePop
            </h2>

            <p class="mt-1 max-w-[190px] text-sm font-medium text-white/80">
              To‘g‘ri so‘zni toping va bubble'ni yorib yuboring!
            </p>
          </div>

          <!-- BUBBLES -->
          <div class="bubble-area">

            <div class="bubble bubble-1">
              apple
            </div>

            <div class="bubble bubble-2">
              book
            </div>

            <div class="bubble bubble-3">
              run
            </div>

            <div class="bubble bubble-4">
              school
            </div>

            <div class="bubble bubble-5">
              ✦
            </div>

            <div class="bubble bubble-6">
              go
            </div>

            <div class="pop pop-1">✦</div>
            <div class="pop pop-2">+</div>
            <div class="pop pop-3">✦</div>

          </div>

          <!-- BOTTOM -->
          <div
            class="relative z-20 mt-5 flex items-center justify-between"
          >
            <div class="flex items-center gap-2 text-white">
              <span class="text-lg">⭐</span>
              <span class="text-sm font-bold">Word Challenge</span>
            </div>

            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-md"
            >
              →
            </div>
          </div>

        </button>


        <!-- ================= SENTENCE MATCH ================= -->
        <button
          @click="openGame('sentence')"
          class="game-card relative w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-5 text-left shadow-lg transition active:scale-[0.98]"
        >

          <!-- TITLE -->
          <div class="relative z-20">
            <div
              class="mb-1 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur"
            >
              SENTENCE GAME
            </div>

            <h2 class="text-2xl font-black text-white">
              Sentence Match
            </h2>

            <p class="mt-1 max-w-[190px] text-sm font-medium text-white/80">
              Aralash so‘zlarni to‘g‘ri gap qilib joylashtiring!
            </p>
          </div>

          <!-- SENTENCE PUZZLE -->
          <div class="sentence-area">

            <div class="sentence-label">
              BUILD THE SENTENCE
            </div>

            <div class="word-row">

              <span class="word-card small">
                early
              </span>

              <span class="word-card">
                wake
              </span>

              <span class="word-card">
                I
              </span>

            </div>

            <div class="word-row second">

              <span class="word-card">
                usually
              </span>

              <span class="word-card">
                up
              </span>

              <span class="word-card">
                morning
              </span>

            </div>

            <div class="arrow-down">
              ↓
            </div>

            <div class="correct-sentence">
              <span>I</span>
              <span>usually</span>
              <span>wake up</span>
              <span>early</span>
            </div>

          </div>

          <!-- BOTTOM -->
          <div
            class="relative z-20 mt-5 flex items-center justify-between"
          >
            <div class="flex items-center gap-2 text-white">
              <span class="text-lg">🧩</span>
              <span class="text-sm font-bold">
                Match the words
              </span>
            </div>

            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-md"
            >
              →
            </div>
          </div>

        </button>

      </div>

    </div>
  </div>
</template>


<script setup>
import Navbars from '../components/Navigation.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const openGame = (game) => {

  if (game === 'bubble') {
    router.push('/BubblePop')
  }

  if (game === 'sentence') {
    router.push('/Oyin')
  }

}
</script>


<style scoped>

.game-card {
  min-height: 320px;
}

/* =========================
   BUBBLE POP
========================= */

.bubble-area {
  position: absolute;
  right: -10px;
  bottom: 55px;
  width: 220px;
  height: 190px;
}

.bubble {
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;

  color: white;
  font-size: 12px;
  font-weight: 900;

  border: 3px solid rgba(255,255,255,.45);

  box-shadow:
    inset 0 5px 10px rgba(255,255,255,.35),
    0 8px 18px rgba(0,0,0,.15);

  animation: float 3s ease-in-out infinite;
}

.bubble-1 {
  width: 68px;
  height: 68px;

  right: 115px;
  top: 15px;

  background: #ff6b9d;

  transform: rotate(-8deg);
}

.bubble-2 {
  width: 72px;
  height: 72px;

  right: 35px;
  top: 0;

  background: #ffd166;

  color: #704900;

  animation-delay: .5s;
}

.bubble-3 {
  width: 60px;
  height: 60px;

  right: 145px;
  top: 85px;

  background: #06d6a0;

  animation-delay: 1s;
}

.bubble-4 {
  width: 75px;
  height: 75px;

  right: 65px;
  top: 75px;

  background: #4cc9f0;

  animation-delay: 1.5s;
}

.bubble-5 {
  width: 42px;
  height: 42px;

  right: 5px;
  top: 90px;

  background: #ff9f1c;

  font-size: 20px;

  animation-delay: .8s;
}

.bubble-6 {
  width: 48px;
  height: 48px;

  right: 120px;
  top: 135px;

  background: #9b5de5;

  animation-delay: 1.8s;
}

.pop {
  position: absolute;

  color: white;

  font-weight: 1000;
  font-size: 22px;

  animation: pop 1.8s infinite;
}

.pop-1 {
  right: 45px;
  top: 60px;
}

.pop-2 {
  right: 140px;
  top: 55px;

  animation-delay: .7s;
}

.pop-3 {
  right: 20px;
  top: 145px;

  animation-delay: 1.2s;
}


/* =========================
   SENTENCE MATCH
========================= */

.sentence-area {
  position: absolute;

  right: 12px;
  bottom: 58px;

  width: 225px;
  height: 190px;

  padding: 10px;
}

.sentence-label {
  margin-bottom: 7px;

  color: rgba(255,255,255,.8);

  font-size: 8px;
  font-weight: 900;

  letter-spacing: 1px;
}

.word-row {
  display: flex;
  gap: 5px;

  margin-bottom: 6px;

  transform: rotate(-2deg);
}

.word-row.second {
  transform: rotate(2deg);
  margin-left: 15px;
}

.word-card {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px 9px;

  border-radius: 10px;

  background: white;

  color: #2450a4;

  font-size: 9px;
  font-weight: 900;

  box-shadow:
    0 5px 10px rgba(0,0,0,.15);
}

.word-card.small {
  background: #fff3a8;
  color: #765900;
}

.arrow-down {
  text-align: center;

  color: white;

  font-size: 20px;
  font-weight: 900;

  line-height: 20px;
}

.correct-sentence {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  gap: 4px;

  padding: 9px;

  border-radius: 13px;

  background: rgba(255,255,255,.18);

  border: 2px dashed rgba(255,255,255,.6);

  backdrop-filter: blur(5px);
}

.correct-sentence span {
  padding: 5px 7px;

  border-radius: 7px;

  background: white;

  color: #2450a4;

  font-size: 8px;
  font-weight: 900;
}


/* =========================
   ANIMATIONS
========================= */

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(-3deg);
  }

  50% {
    transform: translateY(-7px) rotate(3deg);
  }

}

@keyframes pop {

  0% {
    opacity: 0;
    transform: scale(.5);
  }

  30% {
    opacity: 1;
    transform: scale(1.2);
  }

  60% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(1.4);
  }

}


/* TELEFON */
@media (max-width: 380px) {

  .game-card {
    min-height: 300px;
  }

  .bubble-area {
    right: -25px;
    transform: scale(.88);
    transform-origin: right bottom;
  }

  .sentence-area {
    right: -10px;
    transform: scale(.88);
    transform-origin: right bottom;
  }

}

</style>