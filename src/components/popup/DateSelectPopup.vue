<template>
   <div class="attendance--md date-select">
       <div class="md__contents" style="margin:0;">
         <ion-datetime 
         presentation="date" 
         :prefer-wheel="true"
         mode="ios"
         showDefaultButtons="true"
         :cancel="closePopup"
         @ionChange="doneDateSelect"
         >
      </ion-datetime>
       </div>
   </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { IonDatetime } from '@ionic/vue';

const store = useStore();

const closePopup = () => {
   store.commit('dateSelectPopup/showDateSelectPopup', false);
};

const doneDateSelect = e => {
   const selectDate = e.detail.value;
   store.commit('dateSelectPopup/dateSelectDone', selectDate);
   closePopup();
};

</script>

<style lang="scss" scoped>
.sc-ion-buttons-md-s ion-button:not(.button-round) {
}
.sc-ion-buttons-ios-s ion-button {
   font-size: 14px;
}
.attendance--md.date-select {
   padding:0;
   flex-flow:column;
   justify-content:end;

   .md__contents {
      padding:0;
      > ion-datetime {
         width: 100%;
         max-width: 100%;
         --background:#fff;
         --wheel-highlight-background: #fff;
         --wheel-fade-background-rgb: rgba(255,255,255,.1);
      }
      ion-datetime::part(wheel-item) {
         color:#AEAEAE;
         font-size: 23px;
         font-weight: 400;
         opacity: .2;
         transition: all .2s;
      }

      ion-datetime::part(wheel-item active) {
         color: #16191C;
         opacity: 1;
      }
   }
   .dateSelect-header {
      display:flex;
      justify-content:space-between;
      padding: 12px 15px;
      gap: 10px;
      border-bottom: 1px solid #CCCCCC;
      > a {
         color: #3478F6;
         font-size: 15px;
         font-weight: 500;
      }
   }


}
</style>
