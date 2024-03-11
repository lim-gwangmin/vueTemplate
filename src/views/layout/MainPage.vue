<template>
    <ion-page>
        <access-popup v-if="showYn"></access-popup>
        <stdnt-untact-code-modal v-if="stdntAlert"></stdnt-untact-code-modal>
        <stdnt-code-modal v-if="codeAttShow"></stdnt-code-modal>
        <profsr-att-code-modal v-if="prfsrAlert"></profsr-att-code-modal>
        <date-select-popup v-if="dateSelectshowYn"></date-select-popup>
         <beacon-popup v-if="beaconPopupToggle"></beacon-popup>

        <ion-header mode="md">
            <div class="app_container">
               <ion-toolbar>
                  <ion-back-button default-href="/cnu" v-if="$route.path !== '/cnu/mainPage'" mode="md" slot="start" shape="round" fill="clear" :icon="backIcon" />
                  <div v-else style="width: 42px" slot="start"></div>
                  <ion-title>
                     <h1 v-if="$route.path === '/cnu/mainPage'"><strong>CNU</strong>전자출결</h1>
                     <h2 v-if="$route.path !== '/cnu/mainPage'">{{ title }}</h2>
                  </ion-title>
                  <ion-button @click="logout()" mode="md" slot="end" shape="round" fill="clear" class="btn-logout">
                     <ion-icon slot="icon-only" :src="logoutIcon" />
                  </ion-button>
               </ion-toolbar>
               <div class="segment-box">
                  <ion-segment :value="selectedTab" mode="md">
                     <ion-segment-button value="tab1" @click="changeTab(1)" mode="md">
                           <ion-label>출석등록</ion-label>
                     </ion-segment-button>
                     <ion-segment-button value="tab2" @click="changeTab(2)" mode="md">
                           <ion-label>출결현황</ion-label>
                     </ion-segment-button>
                     <ion-segment-button v-if="visibleSettingTabMenu(router)" value="tab3" @click="changeTab(3)" mode="md">
                           <ion-label>설정</ion-label>
                     </ion-segment-button>
                  </ion-segment>
               </div>
            </div>
        </ion-header>
        <ion-content>
            <ion-router-outlet></ion-router-outlet>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonTitle, IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue';
import { 
   AccessPopup, 
   DateSelectPopup, 
   StdntUntactCodeModal, 
   StdntCodeModal, 
   ProfsrAttCodeModal,
   BeaconPopup,
} from '@/components';
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import logoutIcon from '@/assets/img/icons/logout.svg';
import backIcon from '@/assets/img/icons/back.svg';

const store = useStore();
const router = useRouter();

const selectedTab = ref('tab1');
const showYn = computed(() => store.state.accessPopup.showAccessPopup);
const stdntAlert = computed(() => store.state.accessPopup.showAlert);
const prfsrAlert = computed(() => store.state.accessPopup.showCodePopup);
const codeAttShow = computed(() => store.state.accessPopup.showCodeAttPopup);
const dateSelectshowYn = computed(() => store.state.dateSelectPopup.showDateSelectPopup);
const beaconPopupToggle = computed(() => store.state.beaconPopup.visible);
const VISIBLE_SETTING_URL = '/cnu/profsr/att/class';


const title = computed(() => {
    if (selectedTab.value == 'tab1') {
        return '출결상세';
    } else if (selectedTab.value == 'tab2') {
        return '출결현황';
    } else if (selectedTab.value == 'tab3') {
        return '설정';
    }

    return '출결상세';
});

const isStudent = computed(() => {
    const user = store.state.signIn.user;

    if (user) {
        return user.sttsClsfCd != null;
    }

    return true;
});

const visibleSettingTabMenu = router => {
   const { path, params } = router.currentRoute.value;

   if( path === VISIBLE_SETTING_URL || params?.openSbjtNo ) return true;
   return false;
};

watch(
    () => router.currentRoute.value.path,
    (path) => {
        if (['/cnu/mainPage', '/cnu/stdnt/att/class', '/cnu/stdnt/att/untact/code', '/cnu/profsr/att/modify', '/cnu/profsr/att/class', '/cnu/profsr/att/code', '/cnu/stdnt/att/codechk'].includes(path)) {
            selectedTab.value = 'tab1';
        } else if (['/cnu/profsr/att/status', '/cnu/stdnt/att/CardStatus', '/cnu/stdnt/att/status', '/cnu/stdnt/att/detail'].includes(path)) {
            selectedTab.value = 'tab2';
        } else if (visibleSettingTabMenu(router)) {
            selectedTab.value = 'tab3';
        }
    }
);

function changeTab(tab) {
   const paramOpenSbjtNo = store.state.profsr.searchEattdOpenRpstStaffInfo.openSbjtNo;
   const paramBcEquipYn = store.state.profsr.lecture.bcEquipYn;

    switch (tab) {
        case 1:
            router.push('/cnu/mainPage');
            break;
        case 2:
            store.commit('common/termUpdate', true);
            if (isStudent.value) {
               router.push('/cnu/stdnt/att/status');
            } else {
               router.push('/cnu/profsr/att/status');
            }
            break;
        case 3:
            router.push(`/cnu/profsr/setup/${paramOpenSbjtNo}/${paramBcEquipYn}`);
    }
}

function logout() {
    store.dispatch('signIn/logout');
}
</script>

<style lang="scss" scoped>
ion-header {
    padding-top: constant(safe-area-inset-top);
    background-color: var(--background-color);
    &::after {
        display: none;
    }
    ion-toolbar {
        --padding-top: 16px;
        --padding-start: 16px;
        --padding-end: 16px;
        --background: var(--background-color);
    }
    ion-title {
        text-align: center;
        h1,
        h2 {
            font-size: clamp(23px, 4vw, 27px);
            color: #000;
            letter-spacing: -0.03em;
            padding-top: 0.2em;
            strong {
                margin-right: 0.2em;
                color: var(--ion-color-primary);
            }
        }
    }
    .button {
        width: 48px !important;
        height: 48px !important;
        --padding-top: 0 !important;
        --padding-end: 0 !important;
        --padding-bottom: 0 !important;
        --padding-start: 0 !important;
    }

    ion-back-button {
        --color: var(--ion-color-primary) !important;
        --background: rgba(var(--ion-color-primary-rgb), 0.04);
    }
    .btn-logout {
      font-size: 13px;
    }
}

.segment-box {
    padding-top: 10px;
    ion-segment {
        ion-segment-button {
            --indicator-height: 3px;
            --color: rgba(var(--ion-color-primary-rgb), 0.3);
            min-height: 56px;
        }
        ion-label {
            letter-spacing: -0.002em;
            font-size: clamp(16px, 4vw, 19px);
            --indicator-height: 5px;
        }
    }
}
</style>
