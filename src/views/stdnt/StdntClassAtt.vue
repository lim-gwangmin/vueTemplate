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

                  <stdnt-class-regist ref="regist"></stdnt-class-regist>
               </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { StdntClassDetail, StdntClassRegist } from '@/components';
import { ref } from 'vue';
import { onIonViewWillLeave } from '@ionic/vue';

const cont = ref('cont');
const closed = ref(false);

function closeDetail() {
    closed.value = !closed.value;
}

onIonViewWillLeave(() => {
    cont.value.$el.scrollToPoint(0, 0);
});
</script>
