import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import MovieView from "@/views/MovieView.vue";
import GenresView from "@/views/GenresView.vue";
import GenreMoviesView from "@/views/GenreMoviesView.vue";
import AccountView from "@/views/AccountView.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/movie/:id',
    name: 'MovieView',
    component: MovieView,
    props: true,
  },
  {
    path: '/genres',
    name: 'GenresView',
    component: GenresView,
  },
  {
    path: '/genre/:genre',
    name: 'GenreMoviesView',
    component: GenreMoviesView,
    props: true,
  },
  {
    path: '/account',
    name: 'AccountView',
    component: AccountView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
