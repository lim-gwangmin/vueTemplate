<template>
    <ion-page>
        <ion-header style="padding-top: constant(safe-area-inset-top)">
            <ion-toolbar>
                <ion-back-button default-href="/signIn" mode="ios" text="" style="margin-right: 10px"> </ion-back-button>
                <h2>앱체크</h2>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-input v-model="subLoginUser.mbrNo" placeholder="input"></ion-input>
                    <ion-button @click="subSignIn">Go</ion-button>
                </ion-item>
                <ion-item>
                    <ion-button @click="wifiTest">wifi test</ion-button>
                </ion-item>
                <ion-item>
                    <ion-button @click="scanTest">scan test</ion-button>
                </ion-item>
                <ion-item>
                    <ion-button @click="checkGps">gps test</ion-button>
                </ion-item>
                <ion-item>
                    <ion-button @click="checkTTS">tts test</ion-button>
                </ion-item>
            </ion-list>

            <div style="padding: 50px">
                SSID : {{ wifiWiardSSID }} <br />
                BSSID: {{ wifiWiardBSSID }} <br />
                QR : {{ qrData }} <br />
                GPS : {{ gps }}
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonInput, IonItem, IonList } from '@ionic/vue';
import SearchMobileUsr from '@/model/search-mobile-usr';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner';
import { Geolocation } from '@capacitor/geolocation';
import { TextToSpeechAdvanced } from '@awesome-cordova-plugins/text-to-speech-advanced';
import { isPlatform } from '@ionic/core';

export default {
    name: 'sub-login',
    components: {
        IonInput,
        IonItem,
        IonList,
    },

    data() {
        return {
            subLoginUser: new SearchMobileUsr(),
            wifiWiardSSID: '',
            wifiWiardBSSID: '',
            qrData: null,
            gps: null,
        };
    },

    methods: {
        subSignIn() {
            this.subLoginUser.mbrPw = this.subLoginUser.mbrNo;
            this.$store.dispatch('signIn/subLogin', this.subLoginUser);
        },
        wifiTest() {
            try {
                WifiWizard2.getConnectedSSID().then((ssid) => {
                    this.wifiWiardSSID = ssid;
                });
                WifiWizard2.getConnectedBSSID().then((macAddr) => {
                    this.wifiWiardBSSID = macAddr;
                });
            } catch (err) {
                console.log('err', err);
            }
        },
        scanTest() {
            BarcodeScanner.scan({
                showFlipCameraButton: true,
                prompt: 'QR 출석코드를 영역에 맞춰 주세요.',
                resultDisplayDuration: 0,
                formats: 'QR_CODE',
            }).then((d) => {
                this.qrData = d;
            });
        },
        checkGps() {
            Geolocation.getCurrentPosition().then((p) => {
                this.gps = p;
            });
        },
        checkTTS() {
            const ttsOpt = {
                text: '읽어주기 테스트입니다.',
                identifier: 'ko-kr-x-kob-local',
                locale: 'ko-KR',
                cancel: true,
            };
            if (isPlatform('ios')) {
                ttsOpt.identifier = 'com.apple.ttsbundle.Yuna-compact';
            } else if (isPlatform('android')) {
                ttsOpt.identifier = 'ko-kr-x-kob-local';
                ttsOpt['rate'] = 1.3;
            }

            TextToSpeechAdvanced.speak(ttsOpt)
                .then(() => {
                    console.log('finish');
                    TextToSpeechAdvanced.stop();
                })
                .catch((reason) => {
                    console.log('reason', reason);
                    TextToSpeechAdvanced.stop();
                });
        },
    },
};
</script>
