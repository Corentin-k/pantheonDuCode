<template id="chifoumi">

  <h2>Votre Choix</h2>
  <div class="game-icons">
    <div class="icon" @click="selectIcon('pierre')">
      <span :class="{'selected': selectedIcon === 'pierre'}">🪨</span>
    </div>
    <div class="icon" @click="selectIcon('feuille')">
      <span :class="{'selected': selectedIcon === 'feuille'}">📄</span>
    </div>
    <div class="icon" @click="selectIcon('ciseaux')">
      <span :class="{'selected': selectedIcon === 'ciseaux'}">✂️</span>
    </div>
  </div>

  <h2>Résultat</h2>
  <p>Robot : {{ robotChoice }}</p>
  <p>{{ resultMessage }}</p>
</template>

<script setup>
import { ref } from 'vue';
import { useCounterStore } from '../stores/store.js'; // Assurez-vous que le chemin est correct

const selectedIcon = ref(''); // Choix de l'utilisateur
const robotChoice = ref(''); // Choix du robot
const resultMessage = ref(''); // Résultat du match
const store = useCounterStore(); // Crée une instance du store

function getRobotChoice() {
  const choices = ['pierre', 'feuille', 'ciseaux']; // Les choix possibles pour le robot
  return choices[Math.floor(Math.random() * choices.length)]; // Choix aléatoire
}

function selectIcon(icon) {
  selectedIcon.value = icon; // Définit l'icône sélectionnée par le joueur
  robotChoice.value = getRobotChoice(); // Le robot fait un choix aléatoire

  // Logique de comparaison
  if (icon === robotChoice.value) {
    resultMessage.value = "C'est une égalité !";
    store.egality();
  } else if (
      (icon === 'pierre' && robotChoice.value === 'ciseaux') ||
      (icon === 'feuille' && robotChoice.value === 'pierre') ||
      (icon === 'ciseaux' && robotChoice.value === 'feuille')
  ) {
    resultMessage.value = "Vous avez gagné !";
    store.win();
  } else {
    resultMessage.value = "Le robot a gagné !";
    store.lose();
  }

  // Affiche les scores actuels dans la console
  console.log(`Victoire : ${store.victory}, Défaites : ${store.loser}, Egalités : ${store.tie}`);
}
</script>

<style scoped>
.game-icons {
  display: flex;
  justify-content: center;
  gap: 30px; /* Espacement entre les icônes */
}

.icon {
  font-size: 5rem; /* Taille de l'icône */
  cursor: pointer; /* Curseur de main au survol */
  transition: transform 0.2s; /* Animation de la transformation */
}

.icon:hover {
  transform: scale(1.2); /* Agrandissement au survol */
}

.selected {
  animation: bounce 0.5s; /* Animation de rebond lorsque sélectionnée */
}

.robot {
  font-size: 10rem;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-10px);
  }
}
h2,p{
  color:#f9f9f9;
}


</style>
