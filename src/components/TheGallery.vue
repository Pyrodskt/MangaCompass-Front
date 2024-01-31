<template>
    <v-container class="container">
      <v-text-field type="text" v-model="searchTerm" placeholder="Search..." class="searchbar"/>
      <h1>Nouveaux chapitres</h1>
      <v-container class="gallery">
        
        <v-card v-for="item in filteredItems" :key="item.id" class="gallery-item text-center mx-auto text-h5 mb-6" :title="item.title" >
          <!-- <v-img :src="'assets/dbz.jpg'" alt="Gallery Item"/> -->
          <!-- <v-card-title :title="item.title"></v-card-title> -->
          <v-card-subtitle>{{ item.current + " / " + item.list[0] }}</v-card-subtitle>
          <!-- <v-combobox :items="item.list" item/> -->
          <v-btn block @click="this.selectItem(item)" color="light-green">Voir plus</v-btn>
        </v-card>
        <v-dialog v-model="dialog" theme="light" transition="dialog-bottom-transition">
          <v-sheet elevation="12" max-width="600" rounded="lg" width="100%" class="pa-4 text-center mx-auto">
            
            <h1 class="text-h5 mb-6">{{ this.selected_item.title }}</h1>
            <h3>Lecture sur : {{ this.selected_item.url.split("/")[2] }}</h3>
            <h2>Derniers chapitres</h2>
            <v-list :items="this.selected_item.list.slice(0, 5)" ></v-list>
            <h2>Dernier chapitre lu : {{ this.selected_item.current }}</h2>
            <br/>
            <div class="dialog-actions">
              <v-btn color="success" @click="openInNewTab(this.selected_item.url)">Lire en ligne</v-btn>
              <v-btn color="close" @click="this.dialog = false">Fermer la page</v-btn>
            </div>
            

            
          </v-sheet>
        </v-dialog>
      </v-container>
    </v-container>
    
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        searchTerm: '',
        items: [],
        selected_item: [],
        api_result: this.getData(),
        dialog: false,
        
      };
    },
    methods: {
      getData() {
        try {
          const response =  axios.get("http://localhost:5000/mangas").then(response => { this.items = response.data.message.datas})
          return response
          

        }
        catch(error) {
          console.log(error)
          
        }
      },
      selectItem(sel) {
        this.selected_item = sel
        this.dialog = true
      },
      openInNewTab(url) {
        window.open(url, '_blank', 'noreferrer');
    },
    },
    computed: {
      filteredItems() {
        if (!this.searchTerm) {
          return this.items.filter(value =>  !value.list[0].includes(value.current));
        }
  
        const searchTermLowerCase = this.searchTerm.toLowerCase();
        return this.items.filter(item =>
          item.title.toLowerCase().includes(searchTermLowerCase)
          
        ).filter(value => !value.list[0].includes(value.current));
      },
      

    }
  };

  </script>
  
  <style>
  .container {
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .gallery {
    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border: 2px solid black;
    border-radius: .125rem;
  }
  
  .gallery-item {
    
    margin: 10px;
    text-wrap: wrap;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  .item-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .item-page-middle {
    display: flex;
    flex-direction: row;
    align-items: center;
    
  }

  .searchbar {
    width: 100%;
    height: 20%;
    padding: 12px;
  }
  
  .searchbar:focus {
    outline: none;
  }
  img {
    width: 90%;
    height: auto;
  }

  .dialog-actions{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    
  }
  
  </style>
 