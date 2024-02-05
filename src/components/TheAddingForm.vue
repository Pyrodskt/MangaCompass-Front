<template >
  <v-container class="d-flex flex-column align-center w-100">
    <h1>Ajouter un nouveau manga</h1>
    <v-text-field v-model="titlemodel" label="Titre" :rules="rules" hide-details="auto" class="ma-2 pa-2 w-50"></v-text-field>
    <v-text-field v-model="urlmodel" label="URL" :rules="rules" hide-details="auto" class="ma-2 pa-2 w-50"></v-text-field>
    <v-btn icon="mdi mdi-content-save" @click="this.postData()" class="ma-2 pa-2" color="blue"></v-btn>
    <span>
        Ce site web récupère ses données quotidiennement sur diverses plateformes de lecture en ligne. <br>
        Pour ajouter un url de manga et le suivre il faut que l'url provienne d'une des plateformes suivantes : Webtoon, Manganato, MangaRockTeam. <br>
        D'autres fonctionnalités et modules pour se connecter aux plateformes sont à venir, n'hésitez pas à partager.
    </span>
  </v-container>
    
    
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
        titlemodel: "",
        urlmodel: "",
        rules: [
        value => !!value || 'Required.',
        ]
    };
  },
  methods: {
    
    postData(){
      try {
        const url = "http://localhost:5000/add/manga"
        console.log(url)
        const response = axios.post(url, {"title": this.titlemodel, "url": this.urlmodel}, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => { console.log(res)} )
        return response
      }
      catch(error){
        console.log(error)
      }
    },
    }}
    
    </script>

<style>

</style>