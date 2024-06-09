<template>
    <nav class="navbar">
        <div class="navbar-title">Shapy User</div>
        <v-spacer></v-spacer>
        <v-btn class="mx-5" @click="handleLogOut">Log out</v-btn>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore.js';

const router = useRouter();
const authStore = useAuthStore();
const handleLogOut = () => {
    authStore.removeToken();
    router.push('/');
}
</script>


<style scoped>
.navbar {
    background-color: #333;
    overflow: hidden;
    display: flex;
    align-items: center;
    height: 60px;

}

.navbar-title {
    color: white;
    padding: 14px 20px;
    font-size: 24px;
    font-weight: bold;
}

.navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.navbar li {
    color: white;
    padding: 14px 20px;
}

.navbar a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
}

.navbar a:hover {
    background-color: #ddd;
    color: black;
}
</style>