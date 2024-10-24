import { createRouter, createWebHistory } from 'vue-router';
import ChifoumiView from "../Views/ChifoumiView.vue";
import PlusOuMoinsView from "../Views/PlusOuMoinsView.vue";
import JeuVieView from "../Views/JeuVieView.vue";
import EchecView from "../Views/EchecView.vue";

const routes = [
    { path: '/', redirect: 'chifoumi' },
    { path: '/chifoumi', name: 'chifoumi', component: ChifoumiView },
    { path: '/plusoumoins', name: 'plusoumoins', component: PlusOuMoinsView },
    { path: '/gamelife', name: 'gamelife', component: JeuVieView },
    {path:'/echec',name:'echec',component: EchecView}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
