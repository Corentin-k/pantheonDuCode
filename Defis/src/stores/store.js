import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
    state: () => ({
        victory: 0,
        loser: 0,
        tie: 0,
        tabPlusouMoins:[],
        partyId: 1
    }),
    actions: {
        win() {
            this.victory++;
        },
        lose() {
            this.loser++;
        },
        egality() {
            this.tie++;
        },
        addParty(attemptCount) {
            this.tabPlusouMoins.push({
                id: this.partyId,
                attempts: attemptCount
            });
            this.partyId++;
        },
        resetScores() {
            this.victory = 0;
            this.loser = 0;
            this.tie = 0;
            this.tabPlusouMoins = [];
            this.partyId = 1;
        },

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
        },
        getAllParties(state) {
            return state.tabPlusouMoins;
        }
    }
});
