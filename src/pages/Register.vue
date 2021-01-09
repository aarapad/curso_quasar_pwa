<template>
  <q-page padding>
    <register-form @onRegister="registerApi" />
  </q-page>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'RegisterPage',
  components: { RegisterForm },
  computed: {
    ...mapState('app', ['isOnline'])
  },
  methods: {
    ...mapActions('auth', ['register']),
    ...mapMutations('auth', ['setIsLogged', 'setUser']),
    async registerApi (user) {
      this.$q.loading.show()
      setTimeout( async () => {
        try {
          const {data} = await this.register(user)
          this.setUser(data.user)
          this.setIsLogged(true)
          this.$q.notify({
            type: 'positive',
            message: data.res,
            position: 'top'
          })
          this.$router.push('/')
        } catch (e) {
          this.$q.notify({
            type: 'negative',
            message: e.response.data.message,
            position: 'top'
          })
        } finally {
          this.$q.loading.hide()
        }
      }, 2000)
    }
  },
  watch: {
    isOnline (val) {
      if ( ! val) {
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    if ( ! this.isOnline) {
      this.$router.push('/login')
    }
  },
}
</script>
