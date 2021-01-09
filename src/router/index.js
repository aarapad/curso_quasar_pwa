import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next) => {
    await store.restored
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isLogged = store.state.auth.isLogged
    setTimeout(() => {
      if (requiresAuth && !isLogged) {
        next('/login')
      } else {
        next()
      }
    }, 200)
  })

  return Router
}
