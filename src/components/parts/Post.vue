<template>
    <article class="card border-secondary rounded">
        <div class="card-header d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2 align-items-center">
                <h4 class="mb-0">{{ post.authorPseudo }}</h4>
                <img :src="post.authorImageUrl" alt="" class="rounded-circle" width="30" height="30">
            </div>
            <p class="mb-0">le {{ new Date(post.date).toLocaleString() }}</p>
        </div>
        <img :src="post.postImageUrl" alt="..." v-if="post.postImageUrl">
        <div class="card-body">
            <p class="card-text">{{ post.content }}</p>
        </div>
        <div class="card-footer d-flex">
            <p class="mb-0 me-4">
                <i class="bi bi-chat-left-dots me-2"></i>
                <span class="text-white bg-success py-1 px-2 rounded">{{ post.comments.length }}</span>
            </p>
            <p class="mb-0" v-if="Object.keys(userStore.user).length !== 0">
                <a href="" @click.prevent.stop="postStore.addLike(post.id)"><i class="bi bi-hand-thumbs-up me-2 text-black"></i></a>
                <span class="text-white bg-primary py-1 px-2 rounded">{{ post.like }}</span>
            </p>
        </div>
        <div>
            <p class="mb-0 px-3 py-2 fs-4 border-bottom">Commentaires :</p>
            <p class="mx-3 my-2" v-if="post.comments.length === 0">Il n'y a pas encore de commentaires.</p>
            <ul class="list-group list-group-flush" v-else>
                <li class="list-group-item" v-for="comment in post.comments">
                    <Comment :comment="comment" :key="comment.id"/>
                </li>
            </ul>

        </div>
        <div v-if="Object.keys(userStore.user).length !== 0">
            <p class="mb-0 px-3 py-2 fs-4 border-top">Ajouter un commentaire :</p>
            <CommentForm :postId="post.id"/>
        </div>
    </article>
</template>

<script setup>
import {usePostStore} from '../../stores/postStore.js';
import {useUserStore} from '../../stores/userStore.js';
import Comment from './Comment.vue';
import CommentForm from './CommentForm.vue';

const userStore = useUserStore();
const postStore = usePostStore();
const props = defineProps(['post']);
let post = props.post;
</script>

<style scoped>

</style>