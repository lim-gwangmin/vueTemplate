import axios from 'axios';
import { baseUrl } from '@/model/base-url';
import { storage } from '@/helper/storage';
import { alertMsg } from '@/helper/alertMsg';
import { SplashScreen } from '@capacitor/splash-screen';

const API_URL = baseUrl.apiUrl;

export const signIn = {
    namespaced: true,
    state: {
        user: {},
        isTestId: false,
        resultCode: 0,
        resultMsg: '',
        isLogin: null,
    },

    actions: {
        async init({ commit }) {
            try {
                await storage.migrate();
            } catch { }

            const user = await storage.get('currentUser');
            const isTestId = await storage.get('isTestId');

            commit('setLoginInfo', {
                user,
                isTestId
            });
        },
        login({ commit }, user) {
            const search = user;
            const frm = new FormData();

            frm.append('mbrNo', search.mbrNo);
            frm.append('mbrPw', search.mbrPw);

            axios.post(API_URL + '/signIn', frm).then(
                async (res) => {
                    if (res.status === 200 && res.data.resultCode === 200) {
                        commit('loginSuccess', { data: res.data.resultData, search: search.mbrNo });
                    } else {
                        alertMsg(res.data.resultMsg);
                        commit('logout');
                    }
                },
                (error) => {
                    commit('logout');
                    console.log(error);
                }
            );
        },

        subLogin({ commit }, user) {
            const search = user;
            const frm = new FormData();

            frm.append('mbrNo', search.mbrNo);
            frm.append('mbrPw', search.mbrPw);

            axios.post(API_URL + '/subSignIn', frm).then(
                async (res) => {
                    if (res.status === 200 && res.data.resultCode === 200) {
                        commit('loginSuccess', { data: res.data.resultData, search: search.mbrNo });
                    } else {
                        alertMsg(res.data.resultMsg);
                        commit('logout');
                    }
                },
                (error) => {
                    commit('logout');
                    console.log(error);
                }
            );
        },
        logout({ commit }) {
            commit('logout');
        },
    },
    mutations: {
        async loginSuccess(state, data) {
            if (data.search === 'student' || data.search === 'professor') {
                state.isTestId = true;
            }

            await storage.set('currentUser', JSON.stringify(data.data));
            await storage.set('isTestId', data.search === 'student' || data.search === 'professor' ? "true" : "false");

            state.user = data.data;
            state.isLogin = true;
        },
        async logout(state) {
            await storage.clean();
            state.isTestId = false;
            state.isLogin = false;
            state.user = {};
        },
        setLoginInfo(state, { user, isTestId }) {
            SplashScreen.hide();

            if (user) {
                try {
                    state.user = JSON.parse(user);

                    state.isTestId = isTestId === 'true';
                    state.isLogin = true;
                } catch (err) {
                    console.log(err)
                }
            } else {
                state.isLogin = false;
            }
        },
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        isLogin(state) {
            return state.isLogin;
        },
        isTestId(state) {
            return state.isTestId;
        },
    },
};
