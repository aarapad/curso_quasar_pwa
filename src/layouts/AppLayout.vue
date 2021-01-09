<template>
  <q-layout view="lHh Lpr lFf" v-if="isMobile">
    <q-header elevated>
      <q-toolbar class="bg-red-13 text-white">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="isLogged" />
        <q-toolbar-title>
          App News
          <div class="text-subtitle1">ver {{ $q.version }}</div>
        </q-toolbar-title>
        <q-btn
          v-for="lang in languages" 
          flat
          round 
          :disable="lang.key == language"
          :key="lang.key"
          icon="language"
          :label="lang.label" 
          stack
          @click.native="setLanguage(lang.key)" />
      </q-toolbar>
      <working-offline />
      <q-tabs class="bg-red-13 text-white" v-if="!isLogged">
        <q-route-tab
          icon="home"
          to="/"
          name="home"
          exact
        />
        <q-route-tab
          icon="input"
          to="/login"
          name="login"
          exact
        />
        <q-route-tab
          v-if="isOnline"
          icon="account_box"
          to="/register"
          name="register"
          exact
        />
      </q-tabs>
      <q-tabs class="bg-red-13 text-white" v-else>
        <q-route-tab
          icon="home"
          to="/"
          name="home"
          exact
        />
        <q-route-tab
          icon="chat"
          to="/news"
          name="news"
          exact
        />
      </q-tabs>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      v-if="isLogged">
      <q-list>
        <q-item-label header>
          {{ $t('welcome_user', {name: user.displayName}) }}
        </q-item-label>
        <q-item clickable v-ripple @click="$router.push('/news')">
          <q-item-section avatar top>
            <q-avatar icon="chat" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>News</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="subdirectory_arrow_right" />
          </q-item-section>
        </q-item>    
        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar top>
            <q-avatar icon="account_circle" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cerrar sesión</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="subdirectory_arrow_right" />
          </q-item-section>
        </q-item>    
      </q-list>
    </q-drawer>
    <q-page-container style="padding-left:30px; padding-right:30px;">
      <router-view />
    </q-page-container>
  </q-layout>
  <q-layout view="lHh Lpr lFf" v-else>
    <no-mobile-device />
  </q-layout>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import WorkingOffline from 'components/WorkingOffline';
  import NoMobileDevice from 'src/components/NoMobileDevice.vue';
  export default {
    name: 'MainLayout',
    components: { WorkingOffline, NoMobileDevice },
    data () {
      return {
        leftDrawerOpen: false,
        isMobile: this.$q.platform.is.mobile
      }
    },
    watch: {
      language(newValue) {
        this.$i18n.locale = newValue;
      }
    },
    computed: {
    ...mapState('app', ['languages', 'language', 'version', 'isOnline']),
    ...mapState('auth', ['isLogged', 'user'])
    },
    methods: {
      ...mapMutations('app', ['setLanguage', 'setIsOnline']),
      ...mapMutations('auth', ['setIsLogged', 'setUser']),
      logout(){
        this.setUser(null)
        this.setIsLogged(false)
        this.$router.push('/login')
      }
    },
    watch: {
      language (val) {
        this.$i18n.locale = val
      }
    },
    mounted () {
      setTimeout(() => {
        this.$i18n.locale = this.language
      }, 100)
      window.addEventListener('online', () => {
        this.setIsOnline(true)
      })
      window.addEventListener('offline', () => {
        this.setIsOnline(false)
      })
    },
  }
</script>
