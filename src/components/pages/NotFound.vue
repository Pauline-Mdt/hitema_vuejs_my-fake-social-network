<template>
    <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Erreur 404</h4>
        <div class="d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" role="img" aria-label="Danger:"></i>
            <div>
                La page que vous avez demandée est introuvable.
            </div>
        </div>        <hr>
        <p class="mb-0">Nous vous invitons à retourner à <RouterLink :to="'/'" class="alert-link ms-1">l'accueil</RouterLink>.</p>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style scoped>

</style>