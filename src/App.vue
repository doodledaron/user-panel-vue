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

// Clear token before the app starts
function clearToken() {
    authStore.removeToken();
    axios.defaults.headers.common['Authorization'] = '';
}
onBeforeMount(() => {
    //initialize pinia for authentication
    authStore.initializeStore();
    clearToken()
    const token = authStore.token

    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token
    } else {
        axios.defaults.headers.common['Authorization'] = ''
    }


});

</script>
