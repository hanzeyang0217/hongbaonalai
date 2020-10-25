import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/MoneyPlanMake',
    name: 'MoneyPlanMake',
    component: () => import(/* webpackChunkName: "about" */ '../views/MoneyPlanMake.vue')
  },
  {
    path: '/',
    redirect: '/RecordInput',
  },
  {
    path: '/RecordInput',
    name: 'RecordInput',
    component: () => import(/* webpackChunkName: "about" */ '../views/RecordInput.vue')
  },
  {
    path: '/MoneyPlan/edit/:time',
    component: () => import(/* webpackChunkName: "about" */ '../views/MoneyPlanMake.vue')
  },
  {
    path: '/MoneyPlan/new',
    name: 'newMoneyPlan',
    component: () => import(/* webpackChunkName: "about" */ '../views/MoneyPlanMake.vue')
  },
  {
    path: '/MoneyPlanMgr',
    name: 'MoneyPlanMgr',
    component: () => import(/* webpackChunkName: "about" */ '../views/MoneyPlanMgr.vue')
  },
  {
    path: '/FortuneTelling',
    name: 'FortuneTelling',
    component: () => import(/* webpackChunkName: "about" */ '../views/FortuneTelling.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router

