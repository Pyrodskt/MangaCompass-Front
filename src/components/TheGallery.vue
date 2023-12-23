<template>
    <v-container class="container">
      <v-text-field type="text" v-model="searchTerm" placeholder="Search..." class="searchbar"/>
      <v-container class="gallery">
        <v-card v-for="item in filteredItems" :key="item.id" class="gallery-item" te>
          <v-card-title v-text="item.title" style="word-break: break-word;"></v-card-title>
          <v-img :src="'src/assets/dbz.jpg'" alt="Gallery Item"/>
          
          <v-combobox :items="item.list" item/>

        </v-card>
      </v-container>>
    </v-container>>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        searchTerm: '',
        items: [],
        api_result: this.getData(),
        
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
          this.items.push({id: i, image:'src/assets/dbz.jpg'})
        }
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
    background-color: green;
  }
  .gallery {
    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: red;
  }
  
  .gallery-item {
    width: 20%;
    margin: 10px;


  }

  .searchbar {
    width: 100%;
    height: 20%;
    padding: 12px;
    
    
  }
  
  .searchbar:focus {
    outline: none;
    background-color: #444;
  }
  img {
    width: 90%;
    height: auto;
  }
  </style>
  