<template>
    <!-- <v-container>
        <v-row class="my-5">
            <v-btn class="mx-5" @click="isSignUp = true">Sign Up</v-btn>
            <v-btn @click="isSignUp = false">Log In </v-btn>
        </v-row>
        <v-container v-if="isSignUp">
            <SignUp @sign-up-success="isSignUp=false"/>
        </v-container>
        <v-container v-if="!isSignUp">
            <LogIn />
        </v-container>
    </v-container> -->
    <v-toolbar>
        <v-row class="my-5">
            <v-btn color="black" class="mx-5" @click="isSignUp = true">Sign Up</v-btn>

            <v-btn color="black" @click="handleSignUp">Log In </v-btn>
        </v-row>
        <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            :height="10"
            color="grey"
            absolute
            bottom
        ></v-progress-linear>
    </v-toolbar>
    <v-container v-if="!isSignUp">
            <LogIn @loading="handleLoading" @auth-error="handleAuthError"/>
        </v-container>
        <v-container v-if="isSignUp">
            <SignUp @sign-up-success="handleSignUp" @loading="handleLoading" @auth-error="handleAuthError"/>
        </v-container>
</template>

<script setup>

import { ref } from 'vue';
import SignUp from '../auth/SignUp.vue'
import LogIn from '../auth/LogIn.vue'


const isSignUp = ref(true);
const loading = ref(false)

const handleSignUp = () => {
    //if not sign up means navigate to login 
    loading.value = false
    isSignUp.value = false // navigate to login
}

const handleAuthError = () => {
    loading.value = false
    console.log('auth error')
}

const handleLoading = () => {
    loading.value = true
    console.log(loading.value)
}

</script>