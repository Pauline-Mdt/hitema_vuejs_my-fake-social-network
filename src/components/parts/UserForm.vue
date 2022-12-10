<template>
    <form class="p-4 border border-secondary rounded bg-light" @submit.prevent.stop="submit">
        <slot></slot>
        <div class="mb-3" v-if="route !== 'login'">
            <label for="pseudo" class="form-label">Pseudo *</label>
            <input type="text" id="pseudo" class="form-control" required minlength="3" v-model="formData.pseudo">
            <div id="pseudodHelp" class="form-text">Le pseudo doit contenir au moins 3 caractères.</div>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email *</label>
            <input type="email" id="email" class="form-control" required v-model="formData.email">
        </div>
        <div class="mb-3" v-if="route === 'profil'">
            <label for="password" class="form-label">Mot de passe</label>
            <input type="password" id="password" class="form-control" minlength="6" v-model="formData.password">
            <div id="passworddHelp" class="form-text">Le mot de passe doit contenir au moins 6 caractères.</div>
        </div>
        <div class="mb-3" v-else>
            <label for="password" class="form-label">Mot de passe *</label>
            <input type="password" id="password" class="form-control" required minlength="6" v-model="formData.password">
            <div id="passworddHelp" class="form-text">Le mot de passe doit contenir au moins 6 caractères.</div>
        </div>
        <div class="mb-3" v-if="route === 'register'">
            <label for="checkpassword" class="form-label">Confirmer le mot de passe *</label>
            <input type="password" id="checkpassword" class="form-control" required v-model="checkPassword">
        </div>
        <div class="mb-3" v-else-if="route === 'profil' && formData.password !== ''">
            <label for="checkpassword" class="form-label">Confirmer le mot de passe *</label>
            <input type="password" id="checkpassword" class="form-control" required v-model="checkPassword">
            <div id="checkPasswordHelp" class="form-text">La confirmation du mot de passe est obligatoire si vous souhaiter le modifier.</div>
        </div>
        <div class="mb-3" v-if="route !== 'login'">
            <label for="profilImageUrl" class="form-label">Url de votre image de profil</label>
            <input type="url" id="profilImageUrl" class="form-control" aria-describedby="imageHelp" v-model="formData.profilImageUrl">
            <div id="imageHelp" class="form-text">La taille conseillée est un carré.</div>
        </div>
        <button type="submit" class="btn btn-success">Valider</button>
        <div class="alert alert-warning d-flex align-items-center mt-4" role="alert" v-if="errorMessage !== ''">
            <i class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" role="img" aria-label="Warning:"></i>
            {{ errorMessage }}
        </div>
        <div class="alert alert-success d-flex align-items-center mt-4" role="alert" v-if="registrationValidated">
            <i class="bi bi-check-circle-fill flex-shrink-0 me-2" role="img" aria-label="Success:"></i>
            Votre inscription à bien été enregistrée.
            Vous pouvez dès à présent <RouterLink :to="'/login'" class="alert-link ms-1"> vous connecter</RouterLink>.
        </div>
        <div class="alert alert-success d-flex align-items-center mt-4" role="alert" v-if="updateValidated">
            <i class="bi bi-check-circle-fill flex-shrink-0 me-2" role="img" aria-label="Success:"></i>
            Les modifications ont bien été enregistrées.
        </div>
    </form>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router';
import {useUserStore} from '../../stores/userStore.js';
import {ref} from 'vue';

const route = useRoute().name;
const router = useRouter();
const userStore = useUserStore();

let formData = route === 'profil' ?
    ref({
        pseudo: userStore.user.pseudo,
        email: userStore.user.email,
        password: '',
        profilImageUrl: userStore.user.profilImageUrl,
    })
    : ref({
        pseudo: '',
        email: '',
        password: '',
        profilImageUrl: '',
    });
let checkPassword = ref('');
let registrationValidated = ref(false);
let updateValidated = ref(false);
let errorMessage = ref('');

const submit = async () => {
    errorMessage.value = '';
    registrationValidated.value = false;
    updateValidated.value = false;
    let submission;

    if (route === 'register') {
        if (checkPassword.value !== formData.value.password) {
            errorMessage.value = 'Les mots de passe ne sont pas identiques. Merci de vérifier votre saisie.';
        } else {
            submission = await userStore.register(formData.value)
            if (submission.state === false) {
                errorMessage.value = submission.message;
            } else {
                registrationValidated.value = true;
                formData.value = {
                    pseudo: '',
                    email: '',
                    password: '',
                    profilImageUrl: '',
                };
                checkPassword.value = '';
            }
        }
    } else if (route === 'profil') {
        if (checkPassword.value !== formData.value.password) {
            errorMessage.value = 'Les mots de passe ne sont pas identiques. Merci de vérifier votre saisie.';
        } else {
            submission = await userStore.update(formData.value)
            if (submission.state === false) {
                errorMessage.value = submission.message;
            } else {
                updateValidated.value = true;
                formData.value.password = '';
                checkPassword.value = '';
            }
        }
    } else {
        submission = await userStore.login(formData.value);
        submission.state === false ?
            errorMessage.value = submission.message
            : router.push('/');
    }
};
</script>

<style scoped>

</style>