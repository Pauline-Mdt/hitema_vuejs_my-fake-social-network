import {defineStore} from 'pinia';
import {addPost, updatePost} from '../services/dbApi.js';

export const usePostStore = defineStore('postStore', {
    state: () => {
        return {
            posts: [],
        }
    },
    getters: {
        postsSorted: function () {
            return this.posts.sort((a, b) => b.date - a.date)
        }
    },
    actions: {
        addLike: function (postId) {
            const post = this.posts.find(post => post.id === postId)
            post.like++
            updatePost(post)
        },
        addComment: function (postId, comment) {
            const post = this.posts.find(post => post.id === postId)
            post.comments.push(comment)
            updatePost(post)
        },
        addPost: async function (post) {
            const newPost = await addPost(post)
            this.posts.unshift(newPost)
        },
    }
})