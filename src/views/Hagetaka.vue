<template>
  <div>
    <HagetakaRoundInfo
      v-bind:roundId="$route.params.id"
      v-bind:roundName="round.roundName"
      v-bind:isAuthor="isAuthor"
    />
    <b-card title="ルール" style="margin: 20px">
      <ul style="text-align:left">
        <li>１人１回、<span style="color: red; ">{{round.minValue}}</span> 以上 <span style="color: red; ">{{round.maxValue}}</span> 以下の数字を投票することが出来ます</li>
        <li>最も大きな数字を投票した人の勝利です</li>
        <li>ただし、他の人と同じ数字を投票してしまった場合、無条件で負けとなります</li>
      </ul>
    </b-card>
    <b-card
      title="投票"
      style="margin: 20px"
      v-if="!submitted"
    >
      <b-form>
        <b-form-group
          label="ユーザ名"
          label-align="left"
          label-for="input-name"
        >
          <b-form-input
            id="input-name"
            placeholder="Enter name"
            v-model="name"
            type="text"
            :state="isValidName"></b-form-input>
          <b-form-invalid-feedback
            :state="isValidName"
            text-align="left"
          >
            半角英数のみ使用してください
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          label="数値"
          label-align="left"
          label-for="input-value"
          v-bind:description="round.minValue + ' 以上 ' + round.maxValue + ' 以下の数字数を入力してください '"
            >
            <b-form-input
              id="input-value"
              placeholder="Enter value"
              v-model="value"
              type="number"
              :state="isValidValue"></b-form-input>
            <b-form-invalid-feedback
              :state="isValidValue"
              text-align="left"
            >
              {{round.minValue}} 以上 {{round.maxValue}} 以下の整数である必要があります
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button
          v-on:click="doAdd"
          v-bind:variant="isValid ? 'primary' : 'false'"
          v-bind:disabled="!isValid">
          送る
        </b-button>
      </b-form>
    </b-card>
    <b-alert variant="success" v-bind:show="submitted">
      投票を受け付けました<br>
      <b-badge>ユーザ名</b-badge> {{name}}<br>
      <b-badge>数値</b-badge> {{value}}<br>
    </b-alert>
  </div>
</template>

<script>
import Firebase from '../js/Firebase'
import Validator from '../js/Validator'
import HagetakaRoundInfo from '../components/HagetakaRoundInfo'

export default {
  components: {
    HagetakaRoundInfo
  },
  data () {
    return {
      round: {
        roundName: null,
        minValue: null,
        maxValue: null,
        date: null
      },
      name: '',
      value: '',
      submitted: false
    }
  },

  created: function () {
    Firebase.getHagetakaRoundInfo(
      this.$route.params.id,
      data => this.round = data
    )
  },

  methods: {
    doAdd () {
      Firebase.submitHagetakaAnswer({
        roundId: this.$route.params.id,
        name: this.name,
        value: Number(this.value),
        date: new Date()
      })

      this.submitted = true
    }
  },

  computed: {
    isValidName () {
      if (this.name === '') return null
      // return Validator.isAlphabeticalNumerical(this.name)
      return true
    },

    isValidValue () {
      if (this.value === '') return null
      if (!Validator.isNumeric(this.value)) return false

      const number = Number(this.value)
      return number >= this.round.minValue && number <= this.round.maxValue
    },

    isValid () {
      return this.isValidName && this.isValidValue
    },

    isAuthor () {
      return this.round.authorId === this.$store.getters.user.uid
    }
  }
}

</script>
<style scoped>
</style>
