<template>
  <div>
    <div class="rowGrid">
      <div class="name"></div>
      <div v-for="letter in letters" :key="letter" class="name">{{ letter }}</div>
    </div>

    <div v-for="(row, rowIndex) in 8" :key="rowIndex" class="rowGrid">
      <div class="name">{{ 8 - rowIndex }}</div>
      <div v-for="(col, colIndex) in 8" :key="colIndex"
           class=""
           :class="{'case':true, 'caseBlack': (rowIndex + colIndex) % 2 !== 0}"
           @click="handleMove(letters[colIndex], 8 - rowIndex)">
        <div class="piece">
          {{ getPieceSymbol(pieces[letters[colIndex] + (8 - rowIndex)]) }}
        </div></div>
      <div class="name">{{ 8 - rowIndex }}</div>
    </div>

    <div class="rowGrid">
      <div class="name"></div>
      <div v-for="letter in letters" :key="letter" class="name">{{ letter }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Chess from './chess.js';
import Piece from "./Piece.js";

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const pieces = reactive({
  A1: new Piece('rook', 'black'),
  A2: new Piece('pawn', 'black'),
  B1: new Piece('knight', 'black'),
  B2: new Piece('pawn', 'black'),
  C1: new Piece('bishop', 'black'),
  C2: new Piece('pawn', 'black'),
  D1: new Piece('queen', 'black'),
  D2: new Piece('pawn', 'black'),
  E1: new Piece('king', 'black'),
  E2: new Piece('pawn', 'black'),
  F1: new Piece('bishop', 'black'),
  F2: new Piece('pawn', 'black'),
  G1: new Piece('knight', 'black'),
  G2: new Piece('pawn', 'black'),
  H1: new Piece('rook', 'black'),
  H2: new Piece('pawn', 'black'),

  A7: new Piece('pawn', 'white'),
  A8: new Piece('rook', 'white'),
  B7: new Piece('pawn', 'white'),
  B8: new Piece('knight', 'white'),
  C7: new Piece('pawn', 'white'),
  C8: new Piece('bishop', 'white'),
  D7: new Piece('pawn', 'white'),
  D8: new Piece('queen', 'white'),
  E7: new Piece('pawn', 'white'),
  E8: new Piece('king', 'white'),
  F7: new Piece('pawn', 'white'),
  F8: new Piece('bishop', 'white'),
  G7: new Piece('pawn', 'white'),
  G8: new Piece('knight', 'white'),
  H7: new Piece('pawn', 'white'),
  H8: new Piece('rook', 'white'),
});
const chess = new Chess(pieces);
let selectedPosition = ref(null);

// Gérer les clics pour déplacer les pièces
function handleMove(column, row) {
  const position = `${column}${row}`;
  if (!selectedPosition.value) {
    selectedPosition.value = position;
  } else {
    chess.move(selectedPosition.value, position);

    selectedPosition.value = null;
  }
}

function getPieceSymbol(piece) {
  if (!piece) return '';
  const symbols = {
    pawn: { white: '♙', black: '♟' },
    rook: { white: '♖', black: '♜' },
    knight: { white: '♘', black: '♞' },
    bishop: { white: '♗', black: '♝' },
    queen: { white: '♕', black: '♛' },
    king: { white: '♔', black: '♚' }
  };
  return symbols[piece.type][piece.color];
}
</script>


<style scoped>
.rowGrid {
  display: flex;
}

.case {
  width: 100px;
  height: 100px;
  background-color: #b8eaee;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.caseBlack {
  background-color: #10519b;
}

.name {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  background-color: transparent;
  color: #00bfff;
  font-weight: bold;
}

.piece {
  font-size: 50px;
  cursor: pointer;
}
</style>
