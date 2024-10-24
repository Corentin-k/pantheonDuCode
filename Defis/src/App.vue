<template class="home">
  <div id="oneP" v-if="(currentGame !== 'gamelife' && currentGame!=='echec' ) && currentGameIndex.value !== 2">
    <img src="./assets/logo.png" style="width:150px" alt="logo 1P">
    <h1>Panthéon du Code</h1>
  </div>

  <button id="prevButton" @click="prevGame" :disabled="currentGame === 'chifoumi'">⬅️ Précédent</button>
  <button id="nextButton" @click="nextGame" :disabled="currentGame === 'echec'">Suivant ➡️</button>

  <router-view></router-view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onBeforeMount } from 'vue';
import router from './router/router.js'; // Importer le router

const games = ['chifoumi', 'plusoumoins', 'gamelife','echec']; // Liste des jeux
const currentGameIndex = ref(0); // Index du jeu courant
const currentGame = computed(() => games[currentGameIndex.value]);

function nextGame() {
  if (currentGameIndex.value < games.length - 1) {
    currentGameIndex.value++;
    router.push(`/${currentGame.value}`);
  }
}

function prevGame() {
  if (currentGameIndex.value > 0) {
    currentGameIndex.value--;
    router.push(`/${currentGame.value}`);
  }
}


router.afterEach((to) => {
  const currentRouteName = to.name;
  console.log("Route actuelle:", currentRouteName);

  if (currentRouteName) {
    const gameIndex = games.indexOf(currentRouteName);
    console.log("Index du jeu:", gameIndex);

    if (gameIndex !== -1) {
      currentGameIndex.value = gameIndex;
    }
  }
});


onBeforeMount(() => {
  const currentRouteName = router.currentRoute.value.name;
  if (currentRouteName) {
    const gameIndex = games.indexOf(currentRouteName);
    if (gameIndex !== -1) {
      currentGameIndex.value = gameIndex;
    }
  }
});
</script>

<style scoped>
#oneP {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

h1 {
  color: rgb(67, 146, 178) !important;
  font-family: Poppins, sans-serif;
}

button {
  margin: 10px;
  padding: 10px;
  font-size: 18px;
}

#nextButton, #prevButton {
  width: 200px;
}

#nextButton {
  position: absolute;
  bottom: 50%;
  right: 0;
  transform: translateX(-50%);
}

#prevButton {
  position: absolute;
  bottom: 50%;
  left: 0;
  transform: translateX(50%);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media screen and (max-width: 990px) {
  #nextButton, #prevButton {
    position: absolute;
    bottom: 25%;
    transform: translateX(0);
  }

  #prevButton {
    left: 0;
  }

  #nextButton {
    right: 0;
  }
}
</style>
