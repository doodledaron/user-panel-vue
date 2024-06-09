<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" offset-md="3">
                <v-card>
                    <v-card-title>
                        <h2>Sign Up</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent>
                            <v-text-field
                                v-model="event.username"
                                label="Username"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="event.password"
                                label="Password"
                                required
                                type="password"
                            ></v-text-field>
                            <v-btn type="submit" @click="handleSignUp" color="primary">Sign Up</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        
            <v-alert v-if="isSignUpSuccess" title="Sign Up Success" type="success">Sign up success</v-alert>
        
    </v-container>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import service from '../services'


const event = ref({
    username: '',
    password: '',
});


const emit = defineEmits(
    ['sign-up-success']
)


const isSignUpSuccess = ref(false)

const handleSignUp = () => {
    service.signUpUser(event.value).then(
        res => {
            if (res.status === 201) {
                console.log(res)
                isSignUpSuccess.value = true
            }
            setTimeout(() => {
                    emit('sign-up-success'); // Delayed emission
                }, 2000); 
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}

</script>