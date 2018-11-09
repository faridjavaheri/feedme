/*
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
*/

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddDish from '@/components/AddDish.vue'
import EditDish from '../components/EditDish.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-dish',
      name: 'AddDish',
      component: AddDish
    },
    {
      path: '/edit-dish/:dish_slug',
      name: 'EditDish',
      component: EditDish
    }
  ]
})
