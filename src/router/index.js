import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Lear from '@/components/Lear.vue'
import English from '@/components/English.vue'
import turkish from '@/components/Turkish.vue'
import reading from '@/components/Reading.vue'
import shadowing from '@/components/Shadowing.vue'
import Register from '@/components/Register.vue'
import Listening from '@/components/Listening.vue'
import Movie from '@/components/Movie.vue'
import Tests from '@/components/Tests.vue'
import Speaking from '@/components/Speaking.vue'
import Vocabulary from '@/components/Vocabulary.vue'
import Chelange from '@/components/Chelange.vue'
import Quiz from '@/components/Quiz.vue'
import BubblePop from '@/components/BubblePop.vue'
import Oyin from '@/components/Oyin.vue'
import Login from '@/components/Login.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/learn',
      name: 'learn',
      component: Lear
    },
    {
      path: '/english',
      name: 'english',
      component: English
    },

    {
      path: '/turkish',
      name: 'turkish',
      component: turkish
    },
    {
      path: '/reading',
      name: 'reading',
      component: reading
    },
    {
      path: '/shadowing',
      name: 'shadowing',
      component: shadowing
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Listening',
      name: 'Listening',
      component: Listening
    },
    {
      path: '/Movie',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/Tests',
      name: 'Tests',
      component: Tests
    },
    {
      path: '/Speaking',
      name: 'Speaking',
      component: Speaking
    },
    {
      path: '/Vocabulary',
      name: 'Vocabulary',
      component: Vocabulary
    },
    {
      path: '/Chelange',
      name: 'Chelange',
      component: Chelange
    },
    {
      path: '/bubblepop',
      name: 'BubblePop',
      component: BubblePop
    },
    {
      path: '/Quiz',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/Oyin',
      name: 'Oyin',
      component: Oyin
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }

  ],
})

export default router
