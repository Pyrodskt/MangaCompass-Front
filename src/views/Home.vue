<template>
    <TheSearchBar v-model="searchTerm" ></TheSearchBar>
    <TheGallery page_title='Nouveaux Chapitres' :searchTerm="this.modelValue"/>
</template>

<script setup>
  import TheGallery from '@/components/TheGallery copy.vue'
  import TheSearchBar from '@/components/TheSearchBar.vue'


  import { ref } from 'vue'

  const searchTerm = ref('')


</script>
