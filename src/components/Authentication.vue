<template>
  <b-nav-item-dropdown
    id="auth"
    v-bind:text="userStatus ? user.email : 'Login'"
    right
  >
      <b-dropdown-item
        v-if="userStatus"
        @click="doLogout"
      >Logout</b-dropdown-item>
      <b-dropdown-item
        v-else
        @click="goToLogin"
      >
        Go to Login Page
      </b-dropdown-item>
  </b-nav-item-dropdown>
</template>
<script>
import Firebase from '../js/Firebase.js'

export default {
  name: 'authentication',
  created: function () {
    Firebase.onAuth()
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    userStatus () {
      return this.$store.getters.isSignedIn
    }
  },
  methods: {
    doLogout () {
      Firebase.logout()
    },
    goToLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>
  #auth {
    font-weight: bold;
    color: white;
  }
</style>
