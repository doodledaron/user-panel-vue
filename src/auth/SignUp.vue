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
                            <v-text-field v-model="event.username" label="Username" required></v-text-field>
                            <v-text-field v-model="event.password" label="Password" required
                                type="password"></v-text-field>
                            <v-btn type="submit" @click="handleSignUp" color="primary">Sign Up</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-alert v-if="errorMessage" variant="tonal">
                        {{ errorMessage }}
                    </v-alert>
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

const errorMessage = ref('')


const emit = defineEmits(
    ['sign-up-success'], ['loading'], ['auth-error']
)


const isSignUpSuccess = ref(false)

const handleSignUp = () => {
    errorMessage.value = ''
    emit('loading')
    
        service.signUpUser(event.value).then(
            res => {
                if (res.status === 201) {
                    console.log(res)
                    isSignUpSuccess.value = true
                }

                emit('sign-up-success'); // Delayed emission

            }
        ).catch(
            err => {
                if (err.response && err.response.data && err.response.data.non_field_errors) {
                    errorMessage.value = err.response.data.non_field_errors[0] + ': Please check your username and password';
                } else {
                    errorMessage.value = 'The user already exists or check your credentials';
                }
                console.log(err);
                emit('auth-error')
            }
        )

}

</script>