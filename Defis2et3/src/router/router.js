import { createRouter, createWebHistory } from 'vue-router';
import ChifoumiView from "../Views/ChifoumiView.vue";
import PlusOuMoinsView from "../Views/PlusOuMoinsView.vue";

const routes=[
    {path:'/',redirect:'chifoumi'},
    {path:'/chifoumi',name:'chifoumi',
    component:ChifoumiView},
    {path:'/plusoumoins',name:'plusoumoins',
    component:PlusOuMoinsView},
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;