<script setup>
import { useCounterStore } from '../stores/store.js';

const store = useCounterStore(); // Crée une instance du store
</script>

<template >

  <button id="stat" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
    Stat
  </button>

  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Statistique</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <div class="container mt-3">
            <h2>Résultat </h2>

            <table class="table">
              <thead>
              <tr>
                <th>Stat</th>
                <th>Nombre</th>
                <th>%</th>
              </tr>
              </thead>
              <tbody>
              <tr class="table-success">
                <td>Victoires</td>
                <td>{{ store.victory }}</td>
                <td>{{ store.winRate.toFixed(2) }}%</td>
              </tr>
              <tr class="table-danger">
                <td>Défaites</td>
                <td>{{ store.loser }}</td>
                <td>{{ store.loseRate.toFixed(2) }}%</td>
              </tr>
              <tr class="table-info">
                <td>Égalités</td>
                <td>{{ store.tie }}</td>
                <td>{{ store.tieRate.toFixed(2) }}%</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
#stat {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
