<template>
  <div>
    <q-input
      v-model="login.email"
      :label="$t('email_help')"
      :hint="$t('email')"
      @blur="$v.login.email.$touch"
      @keyup.enter="onSubmit"
      :error="$v.login.email.$error">
      <template v-slot:prepend>
        <q-icon name="perm_identity" />
      </template>
    </q-input>
    <q-input
      v-model="login.password"
      :label="$t('password_help')"
      :hint="$t('password')"
      :type="isPwd ? 'password' : 'text'"
      @blur="$v.login.password.$touch"
      @keyup.enter="onSubmit"
      :error="$v.login.password.$error">
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
      <template v-slot:prepend>
        <q-icon name="enhanced_encryption" />
      </template>
    </q-input>
    <div>
      <q-btn 
      type="submit" 
      color="red-13"
      class="q-mt-lg full-width"
      icon-right="send"
      :label="$t('login_button')"
      @click.native="onSubmit" />
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  name: "LoginFormComponent",
  data() {
    return {
      isPwd: true,
      login: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    login: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    onSubmit() {
      this.$v.login.$touch();
      if (this.$v.login.$error) {
        this.$q.notify({
          message: this.$t('login_error'),
          position: "top",
          type: "negative",
        });
      } else {
        this.$emit("onLogin", this.login);
      }
    },
  },
};
</script>