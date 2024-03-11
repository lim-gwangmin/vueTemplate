import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { IonicVue, IonContent, IonPage, IonTabBar, IonTabs, IonRouterOutlet, IonHeader, IonBackButton, IonToolbar, IonIcon, IonButton } from '@ionic/vue';
import store from './store';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import '@ionic/vue/css/core.css';

import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import './theme/variables.css';
import './theme/reset.css';
import './theme/attendance.scss';

import { alertController } from '@ionic/vue';
import { Device } from '@capacitor/device';
import { App as CapacitorApp } from '@capacitor/app';

const alertMsg = async (message, url) => {
   const alert = await alertController.create({
       message: message,
       backdropDismiss:false,
       buttons: [{
         'text': '업데이트',
         handler: () => {
            window.open(url);
          },
       }],
       
   });

   alert.present();

   return alert.onWillDismiss();
};

const logDeviceInfo = async () => {
   const { platform, operatingSystem } = await Device.getInfo();
   
   if(platform === 'web') return;

   const { version } = await CapacitorApp.getInfo();
   const numberToVersion = version.replaceAll('.', '');
   const ALERT_COMMENT = '최신 버전 업데이트를 위해 스토어로 이동합니다.';
   const APP_VERSION = 123;

   if(operatingSystem === 'ios') {
      // const APP_VERSION = 123;
      if(numberToVersion >= APP_VERSION) return;
      const URL_APP_STORE =  'itms-apps://itunes.apple.com/app/1611307102';
      alertMsg(ALERT_COMMENT, URL_APP_STORE);
   }
   
   if(operatingSystem === 'android') {
      // const APP_VERSION = 122;
      if(numberToVersion >= APP_VERSION) return;
      const URL_PLAY_STORE = 'market://details?id=kr.ac.cnu.mobile.att';
      alertMsg(ALERT_COMMENT, URL_PLAY_STORE);
   }
};

logDeviceInfo();

const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(store);

app.component('ion-page', IonPage);
app.component('ion-content', IonContent);
app.component('ion-tab-bar', IonTabBar);
app.component('ion-tabs', IonTabs);
app.component('ion-router-outlet', IonRouterOutlet);
app.component('ion-header', IonHeader);
app.component('ion-button', IonButton);
app.component('ion-back-button', IonBackButton);
app.component('ion-toolbar', IonToolbar);
app.component('ion-icon', IonIcon);


router.isReady().then(() => {
    store.dispatch('signIn/init').finally(() => {
        app.mount('#app');

        defineCustomElements(window);
    });
});
