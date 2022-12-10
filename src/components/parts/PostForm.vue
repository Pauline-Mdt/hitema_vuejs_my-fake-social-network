<template>
    <form class="border border-secondary rounded p-4 bg-light" @submit.prevent.stop="submit">
        <h2>Quoi de neuf ?</h2>
        <div class="mb-3">
            <label for="comment" class="form-label">Laisser un nouveau post *</label>
            <textarea id="comment" class="form-control" required v-model="formData.content"></textarea>
        </div>
        <div class="mb-3">
            <label for="postImageUrl" class="form-label">Url de votre image de post</label>
            <input type="url" id="postImageUrl" class="form-control" aria-describedby="imageHelp" v-model="formData.postImageUrl">
            <div id="imageHelp" class="form-text">La taille conseillée est 1000x200px.</div>
        </div>
        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-success">Valider</button>
        </div>
    </form>
</template>

<script setup>
import {usePostStore} from '../../stores/postStore.js';
import {useUserStore} from '../../stores/userStore.js';
import {ref} from 'vue';

const userStore = useUserStore();
const postStore = usePostStore();
let formData = ref({
    content: '',
    postImageUrl: '',
    like: 0,
    authorPseudo: '',
    authorImageUrl: '',
    date: '',
    comments: [],
});

const submit = () => {
    formData.value.authorPseudo = userStore.user.pseudo;
    formData.value.authorImageUrl = userStore.user.profilImageUrl;
    formData.value.date = Date.now();
    postStore.addPost(formData.value);
    formData.value = {
        content: '',
        postImageUrl: '',
        like: 0,
        authorPseudo: '',
        authorImageUrl: '',
        date: '',
        comments: [],
    }
}
</script>

<style scoped>

</style>