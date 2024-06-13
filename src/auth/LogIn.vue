<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" offset-md="3">
                <v-card>
                    <v-card-title>
                        <h2>Log In</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent>
                            <v-text-field v-model="event.username" label="Username" required></v-text-field>
                            <v-text-field v-model="event.password" label="Password" required
                                type="password"></v-text-field>
                            <v-btn type="submit" @click="handleLogIn" color="primary">Log In</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-alert v-if="errorMessage" variant="tonal">
                        {{ errorMessage }}
                    </v-alert>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import service from '../services'
import { useAuthStore } from '../store/authStore.js'; // Import your 

import axios from 'axios';

const router = useRouter()

const event = ref({
    username: '',
    password: '',
});

const errorMessage = ref('')

const emit = defineEmits(['loading'], ['auth-error'])


const authStore = useAuthStore()

const handleLogIn = () => {
    errorMessage.value = ''
    emit('loading')
    console.log(authStore.token)
    console.log(authStore.isAuthenticated)
    
        service.logInUser(event.value).then(
        res => {
            //will return 200 ok -> push to view screen
            console.log(res)

            const token = res.data.auth_token

            authStore.setToken(token)
            axios.defaults.headers.common['Authorization'] = "Token " + token
            console.log('the token is:', authStore.$state.token, authStore.$state.isAuthenticated)
            localStorage.setItem("token", token)

            // Redirect to the view screen
            router.push({ path: '/main-view' });
        }
    ).catch(
        err => {
            if (err.response && err.response.data && err.response.data.non_field_errors) {
                errorMessage.value = err.response.data.non_field_errors[0] + ': Please check your username and password';
            } else {
                errorMessage.value = 'An unknown error occurred.';
            }
            console.log(err);
            emit('auth-error')
        }
    )


}

</script>