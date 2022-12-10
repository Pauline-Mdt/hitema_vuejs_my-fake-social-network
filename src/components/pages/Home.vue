<template>
    <div class="row gap-3">
        <div v-if="Object.keys(userStore.user).length !== 0">
            <PostForm />
        </div>
        <div v-for="post in postStore.posts" :key="post.id">
            <Post :post="post"/>
        </div>
    </div>
</template>

<script setup>
import {useUserStore} from '../../stores/userStore.js';
import {usePostStore} from '../../stores/postStore.js';
import {getAllPosts} from '../../services/dbApi.js';
import Post from '../parts/Post.vue';
import PostForm from '../parts/PostForm.vue';

const userStore = useUserStore();
const postStore = usePostStore();
if (postStore.posts.length === 0) {
    getAllPosts().then(data => postStore.posts = data);
}
</script>

<style scoped>

</style>