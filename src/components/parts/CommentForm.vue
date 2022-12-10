<template>
    <form class="px-3 pb-3" @submit.prevent.stop="submit">
        <div class="mb-3">
            <label for="commentContent" class="form-label">Laisser votre commentaire *</label>
            <textarea id="commentContent" class="form-control" required v-model="formData.content"></textarea>
        </div>
        <button type="submit" class="btn btn-outline-success">Valider</button>
    </form>
</template>

<script setup>
import {usePostStore} from '../../stores/postStore.js';
import {useUserStore} from '../../stores/userStore.js';
import {ref} from 'vue';

const userStore = useUserStore();
const postStore = usePostStore();
const props = defineProps(['postId']);
let postId = props.postId;
let formData = ref({
    content: '',
    pseudo: '',
    date: '',
});

const submit = () => {
    formData.value.pseudo = userStore.user.pseudo;
    formData.value.date = Date.now();
    postStore.addComment(postId, formData.value);
    formData.value = {
        content: '',
        pseudo: '',
        date: '',
    }
}
</script>

<style scoped>

</style>