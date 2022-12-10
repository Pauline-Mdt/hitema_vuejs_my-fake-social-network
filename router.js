import {createRouter, createWebHistory} from 'vue-router';
import Home from './src/components/pages/Home.vue';
import Login from './src/components/pages/Login.vue';
import Register from './src/components/pages/Register.vue';
import Profil from './src/components/pages/Profil.vue';
import NotFound from './src/components/pages/NotFound.vue';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/login', name: 'login', component: Login},
        {path: '/register', name: 'register', component: Register},
        {path: '/profil', name: 'profil', component: Profil},
        {path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound}
    ]
})