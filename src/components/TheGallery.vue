<template>
    <v-container class="container">
      
      <h1>{{ this.pageTitle }}  ( {{ this.filteredItems.length }} titres ) </h1>
      <v-container class="gallery">
        
        <v-card v-for="item in filteredItems" :key="item.id" class="gallery-item text-center mx-auto text-h5 mb-6" :title="item.title" >
          <v-card-subtitle>{{ item.current + " / " + item.list[0] }}</v-card-subtitle>
          <v-btn block @click="this.selectItem(item)" color="light-green">Voir plus</v-btn>
        </v-card>
        <v-dialog v-model="dialog" transition="dialog-bottom-transition">
          <v-sheet elevation="12" max-width="600" rounded="lg" width="100%" class="pa-4 text-center mx-auto">
            
            <h1 class="text-h5 mb-6">{{ this.selected_item.title }}</h1>
            <h3>Lecture sur : {{ this.selected_item.url.split("/")[2] }}</h3>
            <h2>Il vous reste {{ this.calculateDifferenceChapter() }} chapitre à lire</h2>

            
            <h2>Dernier chapitre lu :</h2>
            <div class="update-actions">
              <v-combobox v-model="combomodel" :items="this.selected_item.list"></v-combobox>
              <v-btn  size="large" icon="mdi-content-save" @click="this.postData()" color="success"></v-btn>
            </div>
            
            <div class="dialog-actions">
              <v-btn color="success" @click="openInNewTab(this.selected_item.url)">Lire en ligne</v-btn>
              <v-btn color="close" @click="this.dialog = false">Fermer la page</v-btn>
            </div>
            

            
          </v-sheet>
        </v-dialog>
      </v-container>
      <v-snackbar v-model="snackbar" timeout="2000">
        {{ this.response }}
      </v-snackbar>
    </v-container>
    
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        items: [],
        selected_item: [],
        api_result: this.getData(),
        dialog: false,
        combomodel: '',
        snackbar: false,
        response: ""
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
      postData(){
        try {
          const url = "http://localhost:5000/manga/".concat(this.selected_item.title,"?current=", this.combomodel)
          console.log(url)
          axios.post(url).then(response => { this.response = response.data.message})
          
        }
        catch(error){
          console.log(error)
        }
        this.snackbar = true
      },
      selectItem(sel) {
        this.selected_item = sel
        this.combomodel = this.selected_item.current
        this.dialog = true
      },

      calculateDifferenceChapter() {
        let counter = 1
        this.selected_item.list.some(element => {
            counter+=1
            return element == this.selected_item.current
        });
        return counter
      },
      openInNewTab(url) {
        window.open(url, '_blank', 'noreferrer');
    },
    },
    computed: {
      filteredItems() {      
        const searchTermLowerCase = this.searchTerm.toLowerCase();
        if (this.pageTitle == "Nouveautés"){
          
          if (!this.searchTerm) {
            return this.items.filter(value =>  !value.list[0].includes(value.current));
          }
          else {
            return this.items.filter(item => item.title.toLowerCase().includes(searchTermLowerCase)).filter(value => !value.list[0].includes(value.current));
          }
        }

        if (!this.searchTerm) {
          return this.items;
        }

        else {
          return this.items.filter(item => item.title.toLowerCase().includes(searchTermLowerCase))
        }
      },
      

    },
    props: {
      searchTerm: String,
      pageTitle: String
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
    max-height: 15%;
    padding: 12px;
  }
  
  .searchbar:focus {
    outline: none;
  }
  img {
    width: 90%;
    height: auto;
  }

  .update-actions{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .dialog-actions{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    
  }
  
  </style>
 