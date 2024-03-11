import { createRouter, createWebHistory } from '@ionic/vue-router';
import Splash from '@/Splash.vue';
//import MainPage from '@/views/layout/MainPage.vue';

const routes = [
    {
        path: '/',
        component: Splash,
    },
    {
        path: '/signIn',
        component: () => import('@/views/signIn/Login.vue'),
    },
    {
        path: '/check',
        component: () => import('../CheckApp.vue'),
    },
    {
        path: '/cnu',
        component: () => import('@/views/layout/MainPage.vue'),
        children: [
            {
                path: '',
                redirect: '/cnu/mainPage',
            },
            {
                path: 'mainPage',
                component: () => import('@/views/common/AttMain.vue'),
            },
            {
                path: 'profsr/att/class',
                component: () => import('@/views/profsr/ProfsrClassInfo.vue'),
            },
            {
                path: 'profsr/att/modify',
                component: () => import('@/views/profsr/ProfsrAttModify.vue'),
            },
            {
                path: 'profsr/att/status',
                component: () => import('@/views/profsr/ProfsrAttStatus.vue'),
            },
            {
                path: 'profsr/setup/:openSbjtNo/:bcEquipYn',
                component: () => import('@/views/profsr/ProfsrSetup.vue'),
            },
            {
                path: 'stdnt/att/detail',
                component: () => import('@/views/stdnt/StdntAttDetail.vue'),
            },
            {
                path: 'stdnt/att/class',
                component: () => import('@/views/stdnt/StdntClassAtt.vue'),
            },
            {
               path: 'stdnt/att/status',
               component: () => import('@/views/stdnt/StdntAttStatus.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
