<template>
    <v-container class="container">
      <v-text-field type="text" v-model="searchTerm" placeholder="Search..." class="searchbar"/>
      
      <v-container class="gallery">
        <v-card v-for="item in filteredItems" :key="item.id" class="gallery-item" :title="item.title">
          <!-- <v-img :src="'assets/dbz.jpg'" alt="Gallery Item"/> -->
          <!-- <v-card-title :title="item.title"></v-card-title> -->
          <!-- <v-card-subtitle ></v-card-subtitle> -->
          <!-- <v-combobox :items="item.list" item/> -->
          <v-btn block @click="this.selectItem(item)">Voir plus</v-btn>
        </v-card>
        <v-dialog v-model="dialog" theme="dark">
          <v-sheet elevation="12" max-width="600" rounded="lg" width="100%" class="pa-4 text-center mx-auto">
            
            <h1 class="text-h5 mb-6">{{ this.selected_item.title }}</h1>
            <h2>Derniers chapitres</h2>
            <v-list :items="this.selected_item.list.slice(1, 5)" ></v-list>
            <h2>Dernier chapitre lu : {{ this.selected_item.current }}</h2>
            <v-btn color="success">Lire en ligne</v-btn>

            
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
          console.log(this.items)
          

        }
        catch(error) {
          console.log(error)
          
        }
      },
      createList() {
        for (let i = 0; i < 12; i ++) {
          this.items.push({id: i, image:'assets/dbz.jpg'})
        }
      },
      selectItem(sel) {
        console.log(sel)
        this.selected_item = sel
        this.dialog = true
        console.log(this.selected_item)
      }
    },
    computed: {
      filteredItems() {
        if (!this.searchTerm) {
          return this.items;
        }
  
        const searchTermLowerCase = this.searchTerm.toLowerCase();
        return this.items.filter(item =>
          item.title.toLowerCase().includes(searchTermLowerCase)
        );
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

  
  </style>
 