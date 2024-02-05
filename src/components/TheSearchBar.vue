<template>
    <v-text-field type="text" :value="modelValue" placeholder="Search..." class="searchbar" @input="$emit('update:modelValue', $event.target.value)"/>
</template>


<script setup>


defineProps(['modelValue'])
defineEmits(['update:modelValue'])


</script>