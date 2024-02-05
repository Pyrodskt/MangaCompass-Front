<template>
  <v-app-bar flat>
    <v-app-bar-title class="d-flex align-center justify-center mg-10 w-100 h-100">
      <router-link to="/" class="recherche ma-2 pa-2 no-highlight">Accueil</router-link>
      <router-link to="/recherche" class="recherche ma-2 pa-2">Recherche</router-link>
      <router-link to="/add" class="recherche ma-2 pa-2">Ajouter</router-link>

    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
  //
</script>

<style>
.recherche{
  text-decoration: none;
  color: beige;
}
</style>