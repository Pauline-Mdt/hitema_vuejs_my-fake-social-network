<template>
    <nav class="d-flex flex-column flex-shrink-0 p-3 border rounded" style="width: 280px;">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none navbar-brand">
            <span class="fs-4">MyFakeSocialNetwork</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <RouterLink :to="'/'" class="nav-link">
                    <i class="bi bi-house me-2 text-black"></i>
                    Accueil
                </RouterLink>
            </li>
        </ul>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item" v-if="Object.keys(userStore.user).length === 0">
                <RouterLink :to="'/register'" class="nav-link">
                    <i class="bi bi-pencil-square me-2 text-black"></i>
                    S'inscrire
                </RouterLink>
            </li>
            <li class="nav-item" v-else>
                <RouterLink :to="'/profil'" class="nav-link">
                    <i class="bi bi-person-circle me-2 text-black"></i>
                    Mon profil
                </RouterLink>
            </li>
            <li class="nav-item" v-if="Object.keys(userStore.user).length === 0">
                <RouterLink :to="'/login'" class="nav-link">
                    <i class="bi bi-box-arrow-in-right me-2 text-black"></i>
                    Se connecter
                </RouterLink>
            </li>
            <li class="nav-item" v-else>
                <a href="" @click.prevent.stop="logout" class="nav-link">
                    <i class="bi bi-box-arrow-right me-2 text-black"></i>
                    Se déconnecter
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import {useUserStore} from '../../stores/userStore.js';
import {useRouter} from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const logout = () => {
    userStore.logout()
    router.push('/');
}
</script>

<style scoped>

</style>