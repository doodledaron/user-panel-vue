import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        isAuthenticated: false
    }),
    actions: {
        initializeStore() {
            const token = localStorage.getItem('token');
            if (token) {
                this.setToken(token);
            } else {
                this.removeToken();
            }
        },
        setToken(token) {
            this.token = token;
            this.isAuthenticated = true;
            localStorage.setItem('token', token);
        },
        removeToken() {
            this.token = '';
            this.isAuthenticated = false;
            localStorage.removeItem('token');
        }
    }
});
