import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import EventView from '@/views/EventView.vue'
import FavouritesView from '@/views/FavouritesView.vue'
import CommunityView from '@/views/CommunityView.vue'
import UserView from '@/views/UserView.vue'
import CreateEventView from '@/views/CreateEventView.vue'
import UserInfoEvents from '@/components/userInfo/UserInfoEvents.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/event/:id',
      name: 'event',
      component: EventView,
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: FavouritesView,
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView,
    },
    {
      path: "/user",
      name:"userInfo",
      component: UserView,
    },
    {
      path: '/create_event',
      name: 'create_event',
      component: CreateEventView,
    },
    {
      path:"/user/events",
      name: "userEvents",
      component: UserInfoEvents,
    }
  ],
})

export default router
