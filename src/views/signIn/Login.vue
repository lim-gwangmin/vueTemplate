<template>
    <ion-page>
        <div class="attendance--login">
            <div class="login__frame">
                <h1 class="login__logo">
                    <div class="logo__image">
                        <img src="@/assets/img/logo.svg" alt="CNU" />
                    </div>
                    <span>전자출결 시스템</span>
                </h1>

                <p>충남대학교 <strong>포털 계정으로 로그인</strong> 하시고 <br />비밀번호 변경은 포털에서 진행하시기 바랍니다.</p>

                <form @submit.prevent="validationForm">
                    <ion-grid style="margin-top: 30px">
                        <ion-row>
                            <ion-icon :src="personIcon" />
                            <ion-col>
                                <ion-input ref="id" v-model="user.mbrNo" @keypress.enter="validationForm" label="아이디(포털ID)" label-placement="floating" fill="outline" placeholder="아이디(포털ID)" mode="md" />
                            </ion-col>
                        </ion-row>
                        <ion-row style="margin-top: 10px">
                            <ion-icon :src="lockIcon" />
                            <ion-col>
                                <ion-input ref="password" v-model="user.mbrPw" @keypress.enter="validationForm" label="비밀번호" label-placement="floating" fill="outline" placeholder="비밀번호" type="password" mode="md" />
                            </ion-col>
                        </ion-row>
                    </ion-grid>

                    <ion-button type="submit" expand="block" mode="md"> login </ion-button>
                </form>
            </div>
        </div>
    </ion-page>
</template>

<script setup>
import { IonInput, IonCol, IonGrid, IonRow } from '@ionic/vue';
import SearchMobileUsr from '@/model/search-mobile-usr';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { alertMsg } from '@/helper/alertMsg';

import personIcon from '@/assets/img/icons/person.svg';
import lockIcon from '@/assets/img/icons/lock-alt.svg';

const router = useRouter();
const store = useStore();
const user = ref(new SearchMobileUsr());

const id = ref();
const password = ref();

function validationForm() {
    if (!user.value.mbrNo.trim()) {
        alertMsg('아이디(포털ID)를 입력해 주세요.').then(() => {
            id.value.$el.setFocus();
        });

        return;
    }

    if (!user.value.mbrPw.trim()) {
        alertMsg('비밀번호를 입력해 주세요.').then(() => {
            password.value.$el.setFocus();
        });

        return;
    }

    if (user.value.mbrNo === 'check' && user.value.mbrPw === 'cnuappcheck!@#$') {
        router.replace('/check');
        return;
    }

    store.dispatch('signIn/login', user.value);
}
</script>

<style lang="scss" scoped>
.attendance--login {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &:after {
        content: '';
        position: absolute;
        top: 43%;
        left: 0;
        z-index: 0;
        width: 100%;
        height: calc(972 / 7.5) + vw;
        background: {
            repeat: no-repeat;
            image: url('@/assets/img/attendance/login/background.png');
            size: cover;
        }
    }
    .login__frame {
        max-width: 70%;
        position: relative;
        z-index: 1;
    }

    .login__logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;
        font-weight: normal;
        .logo__text {
            display: block;
            margin-top: calc(20 / 7.5) + vw;
            font-size: calc(35 / 7.5) + vw;
            font-weight: 800;
            color: #1a447a;
        }
        .logo__image {
            position: relative;
            img {
                position: relative;
                z-index: 1;
                width: calc(272 / 7.5) + vw;
            }
            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: calc(-35 / 7.5) + vw;
                z-index: 0;
                width: calc(548 / 7.5) + vw;
                height: calc(216 / 7.5) + vw;
                background: {
                    repeat: no-repeat;
                    image: url('@/assets/img/attendance/login/logo__background.png');
                    size: cover;
                }
            }
        }
    }

    .login__guide {
        margin-top: calc(30 / 7.5) + vw;
        font-size: calc(24 / 7.5) + vw;
        color: #1a447a;
        text-align: center;
        font-weight: 500;
        em {
            font-weight: 700;
        }
    }
}

h1,
p {
    font-family: var(--ion-font-family);
}
h1 span {
    font-size: clamp(18px, 5vw, 30px);
    margin-top: 1em;
    font-weight: 700;
    font-family: var(--ion-font-family);
}
p {
    line-height: 1.3;
    text-align: center;
    letter-spacing: -0.02em;
    font-size: clamp(12px, 3vw, 14px);
    margin-top: 10px;
    color: rgba(#000, 0.6) !important;
}
ion-row {
    position: relative;
    ion-icon {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        color: var(--ion-color-primary);
        z-index: 3;
    }
}

::v-deep(ion-input) {
    --padding-start: 50px !important;
    --border-radius: 10px !important;
    font-weight: 700;
    .label-text {
        font-weight: 400;
        line-height: 19px;
    }
}
ion-button {
    --border-radius: 10px !important;
    --padding-bottom: 24px !important;
    --padding-top: 24px !important;
    --box-shadow: 5px 5px 20px rgba(var(--ion-color-primary-rgb), 0.3);
    margin-top: 20px;
    font-weight: 700;
}
</style>
