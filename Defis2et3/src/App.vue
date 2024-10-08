<template class="home">
  <div id="oneP">
  <img src="./assets/logo.png" style="width:150px" alt="logo 1P">
  <h1>Panthéon du Code</h1>
  </div>
  <button
      id="chifoumi"
      :disabled="isChifoumiActive"
      @click="goToChifoumis"
  >⬅️ Chifoumi</button>

  <button
      id="plusoumoins"
      :disabled="isPlusOuMoinsActive"
      @click="goToPlusOuMoins"
  >Plus ou Moins ➡️</button>

  <router-view></router-view>
</template>

<script setup>
import { ref } from 'vue';
import router from "./router/router.js";

const isChifoumiActive = ref(true);
const isPlusOuMoinsActive = ref(false);

function goToPlusOuMoins() {
  router.push("/plusoumoins");
  isChifoumiActive.value = false;
  isPlusOuMoinsActive.value = true;
}

function goToChifoumis() {
  router.push("/chifoumi");
  isChifoumiActive.value = true;
  isPlusOuMoinsActive.value = false;
}
</script>

<style scoped>
#oneP{
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}
h1 {
  color: rgb(67, 146, 178) !important;
  font-family: Poppins,sans-serif;
}
button {
  margin: 10px;
  padding: 10px;
  font-size: 18px;
}

#plusoumoins,#chifoumi{
  width: 200px;
}
#plusoumoins {
  position: absolute;
  bottom: 50%;
  right: 0;
  transform: translateX(-50%);
}

#chifoumi {
  position: absolute;
  bottom: 50%;
  left:0;
  transform: translateX(50%);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media screen and (max-width: 990px) {
  #chifoumi, #plusoumoins {
    position: absolute;
    bottom: 25%;
    transform: translateX(0);


  }

  #chifoumi {
    left: 0;
  }

  #plusoumoins {
    right: 0;
  }
}

</style>
