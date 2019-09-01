import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import store from '../store'
import {firebaseConfig} from './FirebaseConfig.js'

export default {
  init () {
    firebase.initializeApp(firebaseConfig)

    // settings for auth
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  },
  createUser (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      console.log('create user error')
      const errorCode = error.code
      const errorMessage = error.message
    })
  },
  login (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      console.log('login error')
      const errorCode = error.code
      const errorMessage = error.message
    })
  },
  logout () {
    firebase.auth().signOut()
  },
  onAuth () {
    firebase.auth().onAuthStateChanged(user => {
      user = user || {}
      store.commit('onAuthStateChanged', user)
      store.commit('onUserStatusChanged', !!user.uid)
    })
  },
  getHagetakaRoundInfo (id, setRound) {
    const docRef = firebase
      .firestore()
      .collection('games/hagetaka/rounds')
      .doc(id)

    docRef.get().then(function (doc) {
      if (doc.exists) {
        // 遅延して実行されるので、コールバックで指定するしかない？
        setRound(doc.data())
      } else {
        console.log('No round found!')
      }
    }).catch(function (error) {
      console.log('Error getting round info: ' + error)
    })
  },
  onHagetakaSubmitted (id, callback) {
    firebase
      .firestore()
      .collection('games/hagetaka/answers')
      .where('roundId', '==', id)
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            callback(change.doc.data())
          }
        })
      })
  },
  submitHagetakaAnswer (answer) {
    firebase.firestore().collection('games/hagetaka/answers').add(answer)
  },
  createHagetakaRound (round, setRoundId) {
    firebase.firestore().collection('games/hagetaka/rounds')
      .add(round)
      .then(function (docRef) {
        setRoundId(docRef.id)
      })
  },
  onHagetakaRoundsCreated (userId, addRound) {
    firebase
      .firestore()
      .collection('games/hagetaka/rounds')
      .where('authorId', '==', userId)
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            addRound(change.doc.data(), change.doc.id)
          }
        })
      })
  }
}
