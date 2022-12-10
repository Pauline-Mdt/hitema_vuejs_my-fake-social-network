<template>
    <div>
        <div class="d-flex justify-content-between">
            <p class="mb-2 fw-semibold">{{ comment.pseudo }}</p>
            <p class="mb-2">le {{ new Date(comment.date).toLocaleString() }}</p>
        </div>
        {{ comment.content }}
    </div>
</template>

<script setup>
const props = defineProps(['comment']);
let comment = props.comment;
</script>

<style scoped>

</style>