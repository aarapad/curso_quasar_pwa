<template>
  <div>
    <q-input
      v-model="register.displayName"
      :label="$t('display_name_help')"
      :hint="$t('display_name')"
      @blur="$v.register.displayName.$touch"
      @keyup.enter="onSubmit"
      :error="$v.register.displayName.$error">
      <template v-slot:prepend>
        <q-icon name="perm_identity" />
      </template>
    </q-input>
    <q-input
      v-model="register.email"
      :label="$t('email_help')"
      :hint="$t('email')"
      @blur="$v.register.email.$touch"
      @keyup.enter="onSubmit"
      :error="$v.register.email.$error">
      <template v-slot:prepend>
        <q-icon name="perm_identity" />
      </template>
    </q-input>
    <q-input
      v-model="register.password"
      :label="$t('password_help')"
      :hint="$t('password')"
      :type="isPwd ? 'password' : 'text'"
      @blur="$v.register.password.$touch"
      @keyup.enter="onSubmit"
      :error="$v.register.password.$error">
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
      :label="$t('register_button')"
      @click.native="onSubmit" />
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  name: "RegisterFormComponent",
  data() {
    return {
      isPwd: true,
      register: {
        displayName: '',
        email: "",
        password: "",
      },
    };
  },
  validations: {
    register: {
      displayName: { required, minLength: minLength(2) },
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    onSubmit() {
      this.$v.register.$touch();
      if (this.$v.register.$error) {
        this.$q.notify({
          message: this.$t('register_error'),
          position: "top",
          type: "negative",
        });
      } else {
        this.$emit("onRegister", this.register);
      }
    },
  },
};
</script>