<template>
  <b-alert variant="info" show align="left" id="info" v-if="isAuthor">
    <router-link v-bind:to="'/hagetaka/rounds/' + roundId">投票</router-link>
    |
    <router-link v-bind:to="'/hagetaka/rounds/' + roundId + '/result'">試合結果</router-link>
    <br>
    <b-badge>Round ID</b-badge> {{roundId}}<br>
    <b-badge>Round Name</b-badge> {{roundName}}<br>
  </b-alert>
</template>
<script>
export default {
  props: {
    roundId: String,
    roundName: String,
    isAuthor: Boolean
  }
}
</script>
<style scoped>
  #info a.router-link-exact-active {
    color: black;
  }
</style>
