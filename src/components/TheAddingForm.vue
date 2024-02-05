<template class="d-flex flex-column mb-6">
    <h1>Ajouter un nouveau manga</h1>
    <v-text-field v-model="titlemodel" label="Titre" :rules="rules" hide-details="auto" class="ma-2 pa-2"></v-text-field>
    <v-text-field v-model="urlmodel" label="URL" :rules="rules" hide-details="auto" class="ma-2 pa-2"></v-text-field>
    <v-btn icon="mdi mdi-content-save" @click="this.postData()" class="ma-2 pa-2"></v-btn>
    
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