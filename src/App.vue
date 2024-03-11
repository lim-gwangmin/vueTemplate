<template>
    <ion-app>
        <ion-router-outlet :animated="false"> </ion-router-outlet>
    </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet, useIonRouter } from '@ionic/vue';
import { watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { App } from '@capacitor/app';
import { useEventBus } from '@vueuse/core';

const router = useIonRouter();
const route = useRoute();
const store = useStore();
const resumeBus = useEventBus('app-resume');

onMounted(() => {
    App.addListener('backButton', () => {
        const path = route.path;

        if (['/check', '/signIn', '/cnu', '/cnu/mainPage'].includes(path)) {
            App.exitApp();
            return;
        }
    });

    App.addListener('resume', () => {
        resumeBus.emit();
    });
});

watch(
    () => store.state.signIn.isLogin,
    (isLogin) => {
        if (isLogin) {
            router.replace('/cnu');
        } else {
            router.replace('/signIn');
        }
    },
    {
        immediate: true,
    }
);
</script>
