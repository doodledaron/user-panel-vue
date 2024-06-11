import axios from "axios";
import { useAuthStore } from './store/authStore.js';
import { useShapeStore } from './store/shapeStore.js';

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/user/",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(config => {
    const authStore = useAuthStore();
    if (authStore.token) {
        config.headers['Authorization'] = `Token ${authStore.token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default {
    getShapes(callback ,interval = 3000) {
        // return apiClient.get("/");
        const fetchShapes = () => {
            apiClient.get("/").then(
                (response) => {
                    //return the values in callback
                    console.log(response.data)
                    callback(response.data);
                },
                (error) => {
                    console.error('Error fetching shapes:', error);
                }
            )
        }

        const pollingId = setInterval(fetchShapes, interval)
    },


    // Sign up user
    signUpUser(formData) {
        return apiClient.post('auth/users/', formData);
    },

    // Log in user
    logInUser(formData) {
        return apiClient.post('auth/token/login', formData);
    },

    // Log out user
    logOutUser() {
        const authStore = useAuthStore();
        authStore.removeToken(); // Remove token
        return apiClient.post('auth/token/logout');
    },

    // WebSocket
    // initializeWebSocket() {
    //     const shapeStore = useShapeStore();
    //     const ws = new WebSocket('ws://20.2.198.214:8000/ws/get_shapes/');

    //     ws.onopen = () => {
    //         ws.send('get_shapes');
    //         console.log('WebSocket connection established');
    //     };

    //     ws.onmessage = (event) => {
    //         const res = JSON.parse(event.data);
    //         if (res.shape.shape_create) {
    //             shapeStore.addShape(res.shape.shape_create);
    //         } else if (res.shape.shape_delete) {
    //             shapeStore.removeShape(res.shape.shape_delete);
    //         } else if (res.shape.shape_update) {
    //             shapeStore.updateShape(res.shape.shape_update);
    //         }
    //     };

    //     ws.onclose = () => {
    //         console.log('WebSocket connection closed');
    //         shapeStore.setShowData(false);
    //     };

    //     ws.onerror = (error) => {
    //         console.log(`WebSocket error: ${error}`);
    //         shapeStore.setShowData(false);
    //     };

    //     // Return WebSocket instance to allow manual closing if needed
    //     return ws;
    // },
};
