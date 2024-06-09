<template>
    <v-container>
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
    </v-container>
</template>

<script setup>

import { ref } from 'vue';
import SignUp from '../auth/SignUp.vue'
import LogIn from '../auth/LogIn.vue'
const isSignUp = ref(true);

</script>