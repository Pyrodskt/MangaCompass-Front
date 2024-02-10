<template>
  <v-text-field type="text" v-model="searchTerm" placeholder="Search..." class="searchbar"/>
  <TheGallery pageTitle='Recherche' :searchTerm="searchTerm"/>
</template>

<script setup>
  import TheGallery from '@/components/TheGallery.vue';
</script>
<script>
export default {
    data() {
      return {
        searchTerm: '',
      };
    },
}
</script>