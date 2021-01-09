import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'
import auth from './Auth'
import app from './App'
import news from './News'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: localforage,
  key: 'news_pwa_app',
  asyncStorage: true 
})
export default function () {
  const Store = new Vuex.Store({
    modules: {
      auth, app, news
    },
    plugins: [vuexLocal.plugin]
  })
  return Store
}

