<template>
  <q-page padding>
    <login-form @onLogin="loginApi" />
  </q-page>
</template>

<script>
import LoginForm from '../components/LoginForm'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'LoginPage',
  components: { LoginForm },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    ...mapMutations('auth', ['setIsLogged', 'setUser']),
    async loginApi(user){
      this.$q.loading.show();
      setTimeout(async () => {
        try {
          const {data} = await this.login(user);
          this.setUser(data.user);
          this.setIsLogged(true);
          this.$q.notify({
            type: 'positive',
            message: this.$t('welcome_user', { name: this.user.displayName }),
            position: 'top'
          });
          this.$router.push('/');
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('login_error'),
            position: 'top'
          });
        } finally {
          this.$q.loading.hide();
        }
      }, 2000);
    }
  },
}
</script>
