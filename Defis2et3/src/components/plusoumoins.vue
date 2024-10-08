<template id="plusoumoins">
  <div id="bornes">
    <h2>Choisissez les bornes</h2>
    <input v-model="min" type="number" placeholder="Borne minimale" />
    <input v-model="max" type="number" placeholder="Borne maximale" />
    <br>
    <button v-if="!gameStarted" @click="startGame">Commencer le jeu</button>
  </div>

  <div v-if="gameStarted" >
    <h2>Votre Choix</h2>
    <div id="game">
      <i :class="['fas', 'fa-minus']" :style="{ visibility: feedbackMessage === 'moins' ? 'visible' : 'hidden', color: '#00bfff' }"></i>

    <input id="res" v-model="nmb" placeholder="Entrez un nombre" @keyup.enter="makeGuess" />
      <i :class="['fas', 'fa-plus']" :style="{ visibility: feedbackMessage === 'plus' ? 'visible' : 'hidden', color: 'red' }"></i>

    </div>

    <p>Nombre d'essais : {{ attemptCount }}</p>
    <h1 v-if="win">GAGNEZ !!</h1>
    <br>
    <button @click="rejouer">Rejouer</button>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useCounterStore} from '../stores/store.js';

const min = ref('');
const max = ref('');
const nmb = ref('');
const secretNumber = ref(null);
const feedbackMessage = ref('');
const attemptCount = ref(0);
const gameStarted = ref(false);
let win=ref(false);
const store = useCounterStore();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
  if (min.value > max.value) {

    return;
  }

  secretNumber.value = getRandomNumber(parseInt(min.value), parseInt(max.value));
  gameStarted.value = true;
  feedbackMessage.value = '';
  attemptCount.value = 0;
  nmb.value = '';
}

function makeGuess() {
  const guess = parseInt(nmb.value, 10);
  attemptCount.value += 1;

  if (guess === secretNumber.value) {
    win=true;
    store.addParty(attemptCount)
  } else if (guess < secretNumber.value) {

    feedbackMessage.value = "plus";
  } else {
    feedbackMessage.value = "moins";
  }
}

function rejouer() {
  gameStarted.value = false;
  min.value = '';
  max.value = '';
  nmb.value = '';
  secretNumber.value = null;
  feedbackMessage.value = '';
  attemptCount.value = 0;
}


</script>

<style scoped>
i {
  font-size: 50px;
  cursor: pointer;
  margin: 10px;

}

input {
  margin: 10px;
  padding: 10px;
  font-size: 18px;
  text-align: center;
}
#game{
  display: flex;
  align-content: center;
  justify-content: center;
}
button {
  margin: 20px;
  padding: 10px;
  font-size: 18px;
}

h2, p {
  color: #f9f9f9;
}
h1 {
  color: rgb(67, 146, 178) !important;
  font-family: Poppins,sans-serif;
}
</style>

