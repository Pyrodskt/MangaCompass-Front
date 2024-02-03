<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-img :width="50" src="../../assets/logo.png" @click="console.log('test')"></v-img>
      <router-link to="/">Home</router-link>
      <router-link to="/recherche">Recherche</router-link>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
  //
</script>
