<template>
    <div>
        <RouterView />
    </div>
</template>

<script setup>
import { useAuthStore } from './store/authStore.js'; 
import axios from 'axios';
import { onBeforeMount } from 'vue';

const authStore = useAuthStore(); 

onBeforeMount(() => {
    //initialize pinia for authentication
    authStore.initializeStore(); 

    const token = authStore.token

    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token
    } else {
        axios.defaults.headers.common['Authorization'] = ''
    }

});

</script>


