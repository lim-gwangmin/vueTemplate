<template>
    <ion-page>
        <ion-content :fullscreen="true" ref="cont">
            <div class="attendance--page">
               <div class="app_container">
                  <div class="attendance--class">
                     <div class="class__head">
                        <div class="sub-title pt-top"><span>과목정보</span></div>
                           <button type="button" class="class__toggle" :class="{ 'is--down': closed }" @click="closeDetail()">열고 접기</button>
                     </div>
                     <div class="class__body" :class="{ 'is--hidden': closed }">
                        <stdnt-class-detail></stdnt-class-detail>
                        </div>
                  </div>

                  <stdnt-att-detail-status></stdnt-att-detail-status>

                  <ion-button @click="goBack" expand="block" mode="md" class="mt btn"> 확인</ion-button>
               </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { StdntClassDetail, StdntAttDetailStatus } from '@/components';
import { useStore } from 'vuex';
import { useIonRouter, onIonViewWillLeave } from '@ionic/vue';
import { ref } from 'vue';

const store = useStore();
const router = useIonRouter();

const cont = ref('cont');
const closed = ref(false);


function goBack() {
    store.commit('common/termUpdate', true);
    router.replace('status');
}

function closeDetail() {
    closed.value = !closed.value;
}

onIonViewWillLeave(() => {
    cont.value.$el.scrollToPoint(0, 0);
});
</script>
<style> 
   ion-button.mt.btn {
      height: 46px;
      font-size: 14px;
   }
</style>