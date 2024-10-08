import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
    state: () => ({
        victory: 0,
        loser: 0,
        tie: 0,
    }),
    actions: {
        win() {
            this.victory++;
        },
        lose() {
            this.loser++;  // Corrigé pour incrémenter le compteur de défaites
        },
        egality() {
            this.tie++;
        },
        resetScores() {
            this.victory = 0;
            this.loser = 0;
            this.tie = 0;
        }
    },
    getters: {
        totalGames(state) {
            return state.victory + state.loser + state.tie;
        },
        winRate(state) {
            const total = state.victory + state.loser + state.tie;
            return total > 0 ? (state.victory / total) * 100 : 0;
        },
        loseRate(state) {
            const total = state.victory + state.loser + state.tie;
            return total > 0 ? (state.loser / total) * 100 : 0;
        },
        tieRate(state) {
            const total = state.victory + state.loser + state.tie;
            return total > 0 ? (state.tie / total) * 100 : 0;
        }
    }
});
