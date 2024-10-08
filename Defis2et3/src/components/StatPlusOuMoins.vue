<script setup>
import { useCounterStore } from '../stores/store.js';

const store = useCounterStore(); // Crée une instance du store
</script>

<template>

  <button id="stat" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
    Stat
  </button>


  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Sta PlusouMoins</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <div class="container mt-3">
            <h2>Parties</h2>
            <table class="table table-striped">
              <thead>
              <tr>
                <th>N°</th>
                <th>Nombre de coups</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(party, index) in store.tabPlusouMoins" :key="index">
                <td>{{ index + 1 }}</td> <!-- Index représente l'ID de la partie -->
                <td>{{ party.attempts }}</td> <!-- Nombre de coups pour cette partie -->
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fermer</button>
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

.modal-title {
  font-weight: bold;
}

.table {
  margin-top: 20px;
}

.table th, .table td {
  text-align: center;
}

.btn-danger {
  background-color: #dc3545;
}
</style>
