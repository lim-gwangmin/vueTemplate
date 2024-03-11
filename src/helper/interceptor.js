import axios from 'axios';
import { baseUrl } from '../model/base-url';
import store from '../store/index';
import router from '../router';
import { showErrorToast } from './showErrorToast';

const http = axios.create({
    baseURL: baseUrl.apiUrl,
    params: {
        token: '',
    },
});

http.interceptors.request.use(
    function (config) {
        config.params.token = store.state.signIn.user.token;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    function (response) {
        if (response.data.resultCode !== 200) {
            showErrorToast();
        }
        return response;
    },

    function (error) {
        if (error.response.status === 401) {
            store.dispatch('signIn/logout').then(() => {
                router.replace('/signIn').then(() => { });
                return Promise.reject(error);
            });
        }
        return Promise.reject(error);
    }
);

export default http;
