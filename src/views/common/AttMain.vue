<template>
    <ion-page>
        <ion-content :fullscreen="true" ref="cont">
            <div class="attendance--main">
               <div class="app_container">
                  <div class="today_wapper">
                      <main-today ref="today"></main-today>
                      <component ref="list" :is="comp" />
                  </div>
               </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { MainToday, StdntClassStatus, ProfsrTodayClass } from '@/components';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { onIonViewDidEnter, onIonViewDidLeave, onIonViewWillLeave } from '@ionic/vue';
import { useEventBus } from '@vueuse/core';
const store = useStore();
const cont = ref('cont');
const today = ref('today');
const list = ref('list');
const resumeBus = useEventBus('app-resume');
const comp = computed(() => {
    return store.state.signIn.user.sttsClsfCd == null ? ProfsrTodayClass : StdntClassStatus;
});

onIonViewDidEnter(() => {
   today.value.rive();
   list.value.getSemesterInfo();

   // app 이 foreground 로 올때 화면 리프레시
   resumeBus.on(() => {
      today.value.rive();
      list.value.refresh();
   });
});

onIonViewWillLeave(() => {
    cont.value.$el.scrollToPoint(0, 0);
});

onIonViewDidLeave(() => {
    // 이벤트 리스너 클리어
    resumeBus.reset();

    list.value.isLoading = true;
});
</script>

<style lang="scss" scoped>
.today_wapper {
   position: relative;
}
</style>