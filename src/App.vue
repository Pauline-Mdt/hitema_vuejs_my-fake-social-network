<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Menu from './components/parts/Menu.vue';
</script>

<template>
    <div class="container">
        <div class="row mt-3">
            <aside class="col-4">
                <Menu />
            </aside>
            <main class="col-8">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<style scoped>

</style>
