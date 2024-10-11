<template>
  <div>
    <div class="container-button">
      <button type="button" class="btn btn-success" @click="OneStep">|></button>
      <button type="button" class="btn btn-primary" @click="StartGame">Start</button>
      <button type="button" class="btn btn-danger" @click="StopGame">Stop</button>



      <button type="button" class="btn btn-warning" @click="reset" >
        clear
      </button>
      <div class="dropdown">
        <button
            data-bs-toggle="dropdown"
            title="Clickez sur un emplacement pour mettre positioner le vaisseau"
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            aria-expanded="false">
          Add Ship
        </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item"  @click="enableAddShip(1)" href="#">fireshipreflect</a></li>
            <li><a class="dropdown-item" href="#" @click="enableAddShip(2)">fireshiptagalong</a></li>
            <li><a class="dropdown-item" href="#" @click="enableAddShip(3)">vaisseau31p8h4v0 </a></li>
            <li><a class="dropdown-item" href="#" @click="enableAddShip(4)">weekender</a></li>
          </ul>
      </div>
<!--      https://getbootstrap.com/docs/5.0/utilities/borders/-->
      <button type="button" class="btn btn-info rounded-circle" @click="showVideo" >
        +
      </button>
    </div>
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="rowGrid">
      <div v-for="(cell, colIndex) in row" :key="colIndex"
           :class="{'alive': cell === 1, 'dead': cell === 0}"
           @click="changeColor(rowIndex, colIndex)">
      </div>
    </div>
  </div>


  <!-- Modal Bootstrap -->
<!--  https://getbootstrap.com/docs/5.0/components/modal/-->
  <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="videoModalLabel">Infos</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul style="list-style: none;">
            <li><a href="https://www.youtube.com/watch?v=eMn43As24Bo" target="_blank">Le Jeu de la Vie. Ego</a></li>
            <li><a href="https://www.arte.tv/fr/videos/097454-008-A/voyages-au-pays-des-maths/" target="_blank">Voyages au pays des maths :
              Le jeu de la vie</a></li>

              <li> <a href="https://conwaylife.com/wiki/Spaceship" target="_blank">conwaylife.com/wiki/Main_Page</a></li>
              <li>Liste des vaisseaux : <a href="https://conwaylife.com/wiki/Spaceship" target="_blank">conwaylife.com/wiki/Spaceship</a></li>

          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import {fireshipreflect, fireshiptagalong, vaisseau31p8h4v0, weekender} from './vaisseaux.js'
const rows = 100;
const cols = 100;
const grid = ref(createGrid(rows, cols));
let isPlaying = ref(false);
let intervalId = null;

let fireShipMode = ref(false);
let selectedShip = ref(null);

// Fonction pour créer la grille
function createGrid(rows, cols) {
  return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
  );
}
function reset(){
  grid.value=createGrid(rows, cols);
}
// Fonction pour changer la couleur d'une cellule
function changeColor(rowIndex, colIndex) {
  if (fireShipMode.value) {
    addShip(selectedShip.value,rowIndex, colIndex);
    fireShipMode.value = false;
  } else {
    grid.value[rowIndex][colIndex] = grid.value[rowIndex][colIndex] === 1 ? 0 : 1;
    console.log(`Cellule modifiée: (${rowIndex}, ${colIndex})`);
  }
}
// https://fr.wikipedia.org/wiki/Jeu_de_la_vie
// État  n+1
function stateCell(rowIndex, colIndex) {
  let life = 0;

  if (rowIndex > 0 && grid.value[rowIndex - 1][colIndex] === 1) life++; // haut
  if (rowIndex < rows - 1 && grid.value[rowIndex + 1][colIndex] === 1) life++; // bas
  if (colIndex > 0 && grid.value[rowIndex][colIndex - 1] === 1) life++; // gauche
  if (colIndex < cols - 1 && grid.value[rowIndex][colIndex + 1] === 1) life++; // droite

  // Diagonales
  if (rowIndex > 0 && colIndex > 0 && grid.value[rowIndex - 1][colIndex - 1] === 1) life++; // haut-gauche
  if (rowIndex > 0 && colIndex < cols - 1 && grid.value[rowIndex - 1][colIndex + 1] === 1) life++; // haut-droite
  if (rowIndex < rows - 1 && colIndex > 0 && grid.value[rowIndex + 1][colIndex - 1] === 1) life++; // bas-gauche
  if (rowIndex < rows - 1 && colIndex < cols - 1 && grid.value[rowIndex + 1][colIndex + 1] === 1) life++; // bas-droite

  // Règles du jeu de la vie
  if (grid.value[rowIndex][colIndex] === 0 && life === 3) return 1; // life
  if (grid.value[rowIndex][colIndex] === 1 && (life === 2 || life === 3)) return 1; // life

  return 0; // Dieee
}

function modifyGrid() {
  const gridCopy = createGrid(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      gridCopy[i][j] = stateCell(i, j);
    }
  }
  grid.value = gridCopy;
}

const StartGame = () => {
  isPlaying.value = true;
  intervalId = setInterval(() => {
    modifyGrid();
  }, 100);
};

const StopGame = () => {
  isPlaying.value = false;
  clearInterval(intervalId);
}
const OneStep = () => {
  modifyGrid();
}

const showVideo = () => {
  const modal = new bootstrap.Modal(document.getElementById('videoModal'));
  modal.show();
};


function enableAddShip(index) {
  fireShipMode.value = true;

  // Sélection du motif du vaisseau en fonction de l'index
  switch (index) {
    case 1:
      selectedShip.value = fireshipreflect;
      break;
    case 2:
      selectedShip.value = fireshiptagalong;
      break;
    case 3:
      selectedShip.value = vaisseau31p8h4v0;
      break;
    case 4:
      selectedShip.value=weekender;
      break
  }
  console.log(`Mode pour ajouter le vaisseau ${index} activé, cliquez pour le placer.`);
}
function addShip(pattern, startRow, startCol) {
  // Validation pour vérifier si le vaisseau peut être placé dans la grille
  if (startRow + pattern.length > rows || startCol + pattern[0].length > cols) {
    alert('Impossible de placer le vaisseau à cet endroit.');
    return;
  }

  // Place le vaisseau dans la grille à partir des coordonnées (startRow, startCol)
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      grid.value[startRow + i][startCol + j] = pattern[i][j];
    }
  }
}
</script>

<style scoped>
.rowGrid {
  display: flex;
}

.alive {
  width: 10px;
  height: 10px;
  background-color: #10519b;
  border: 1px solid #000;
}

.dead {
  width: 10px;
  height: 10px;
  background-color: #e5d6d6;
  border: 1px solid #000;
}

.container-button {
  position: fixed;

  bottom: 20px;
 left:50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}
.container-button button, .dropdown {
  display: inline-block;
}


</style>
