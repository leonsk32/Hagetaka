<template>
  <div>
    <b-card
      title="ログイン"
      style="margin: 20px"
      v-if="displayLogin"
    >
      <b-form>
        <b-form-group>
          <b-form-input type="email" placeholder="email" v-model="loginInfo.email"></b-form-input>
          <b-form-input type="password" placeholder="password" v-model="loginInfo.password"></b-form-input>
        </b-form-group>
        <b-button
          v-on:click="login"
          variant="primary">
          ログイン
        </b-button>
      </b-form>
    </b-card>
    <b-card
        title="アカウント作成"
        style="margin: 20px"
        v-else
    >
      <b-form>
        <b-form-group>
          <b-form-input type="email" placeholder="email" v-model="signUpInfo.email"></b-form-input>
          <b-form-input type="password" placeholder="passwod" v-model="signUpInfo.password"></b-form-input>
        </b-form-group>
        <b-button
            v-on:click="signUp"
            variant="primary">
          アカウント作成
        </b-button>
      </b-form>
    </b-card>
    <b-button
      v-on:click="toggle"
      variant="secondary"
      disabled
    >
      {{displayLogin ? 'アカウントを新規作成' : '既存のアカウントでログイン'}}
    </b-button>
  </div>
</template>

<script>
import Firebase from '../js/Firebase'

export default {
  data () {
    return {
      loginInfo: {
        email: '',
        password: ''
      },
      signUpInfo: {
        email: '',
        password: ''
      },
      displayLogin: true
    }
  },

  methods: {
    signUp () {
      Firebase.createUser(this.signUpInfo.email, this.signUpInfo.password)
    },
    login () {
      Firebase.login(this.loginInfo.email, this.loginInfo.password)
    },
    toggle () {
      this.displayLogin = !this.displayLogin
    }
  }
}

</script>
