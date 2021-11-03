import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../../store/index'
import AuthRoutes from './auth'
import RatingsRoutes from './ratings'

import {Guest, middlewarePipeline} from './middleware'

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    name: 'auth',
    redirect: {name: 'auth.signin'},
    component: () => import('../../layouts/default'),
    meta: {
      middleware: [Guest],
    },
    children: AuthRoutes
  },
  {
    path: '/',
    name: 'ratings',
    redirect: {name: 'ratings.dashboard'},
    component: () => import('../../layouts/default'),
    children: RatingsRoutes
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../../views/NotFound'),
    meta: {
      title: 'Page not found'
    }
  }, {
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

middlewarePipeline(router, store);

export default router
